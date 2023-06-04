import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import _ from 'lodash';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import { ComboService } from '../combo/combo.service';
import { AddOrderDto } from './dto/add-order.dto';
import type { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderVo } from './vo/order.vo';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService, private comboService: ComboService) {}

  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  @Post()
  async addOrder(@Body() addOrderDto: AddOrderDto) {
    const orderNumber: string = Date.now().toString();
    const dishIds: number[] = [];

    // Process dto to entity, push dishId to array
    const orderEntities: OrderEntity[] = await Promise.all(
      addOrderDto.dishes.map((dish) => {
        dishIds.push(dish.id);

        return Builder<OrderEntity>()
          .dishId(dish.id)
          .orderNumber(orderNumber)
          .userId(1)
          .quantity(dish.quantity)
          .build();
      }),
    );

    // Batch Insert with transactional
    const insertedEntities: OrderEntity[] = await this.orderService.addOrderBatch(orderEntities);

    // Process Entity to Vo
    const orderVo: OrderVo = OrderVo.fromEntity(insertedEntities);

    // Get the Combo according to dishes
    const combo = await this.comboService.getComboByDishes(dishIds);

    // If there is a combo
    if (combo) {
      orderVo.combo = combo.name;
      // TODO do the price calculation here
    }

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Get All Orders of User',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  @Get()
  async getOrderByUserId(): Promise<OrderVo[]> {
    // TODO make this endpoint authenticated
    const userId = 1;

    // the result may contains different orders
    const orderEntities = await this.orderService.getOrdersByUserId(userId);

    // grouped order base on the order number
    const groupedOrder = _.toArray(_.groupBy(orderEntities, 'orderNumber'));

    return groupedOrder.map((orders: OrderEntity[]) => {
      return OrderVo.fromEntity(orders);
    });
  }
}

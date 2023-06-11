import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import _ from 'lodash';

import { ResponseVo } from '../../common/vo/response.vo';
import { RoleType } from '../../constants';
import { ApiResponse, Auth, AuthUser } from '../../decorators';
import { ComboService } from '../combo/combo.service';
import { DishService } from '../dish/dish.service';
import { UserEntity } from '../user/user.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { AddPaymentDto } from './dto/add-payment.dto';
import type { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderVo } from './vo/order.vo';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private comboService: ComboService,
    private dishService: DishService,
  ) {}

  @ApiOperation({
    summary: 'add order',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.CREATED,
  })
  @Auth([RoleType.USER])
  @Post()
  async addOrder(@AuthUser() user: UserEntity, @Body() addOrderDto: AddOrderDto) {
    const orderNumber: string = Date.now().toString();
    const dishIds: number[] = [];

    // Process dto to entity, push dishId to array
    const orderEntities: OrderEntity[] = await Promise.all(
      addOrderDto.dishes.map((dish) => {
        dishIds.push(dish.id);

        return Builder<OrderEntity>()
          .dishId(dish.id)
          .orderNumber(orderNumber)
          .userId(user.id)
          .quantity(dish.quantity)
          .build();
      }),
    );

    // Batch Insert with transactional
    const insertedEntities: OrderEntity[] = await this.orderService.addOrderBatch(orderEntities);

    // Process Entity to Vo
    const orderVo: OrderVo = OrderVo.fromEntity(insertedEntities);

    const combo = await this.comboService.getComboByDishes(dishIds);

    orderVo.combo = combo?.name;
    orderVo.price = await this.orderService.getPriceByOrder(orderNumber);

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Add the payment',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  @Post('/:orderNumber')
  async addPayment(
    @AuthUser() user: UserEntity,
    @Param('orderNumber') orderNumber: string,
    @Body() addPaymentDto: AddPaymentDto,
  ): Promise<ResponseVo<OrderVo>> {
    const orders: OrderEntity[] = await this.orderService.getOrdersByOrderNumber(orderNumber);

    if (orders[0].userId !== user.id) {
      throw new ForbiddenException('You are not the owner of this order');
    }

    const price = await this.orderService.getPriceByOrder(orderNumber);

    if (addPaymentDto.amount < price) {
      throw new BadRequestException('The amount is not enough');
    }

    try {
      await this.orderService.markCompleted(orderNumber);
    } catch {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const orderEntities = await this.orderService.getOrdersByOrderNumber(orderNumber);

    const orderVo = OrderVo.fromEntity(orderEntities);

    orderVo.price = await this.orderService.getPriceByOrder(orderNumber);

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Cancel the order',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  @Post('/:orderNumber/cancel')
  async cancelOrder(@AuthUser() user: UserEntity, @Param('orderNumber') orderNumber: string) {
    const orders: OrderEntity[] = await this.orderService.getOrdersByOrderNumber(orderNumber);

    if (orders[0].userId !== user.id) {
      throw new ForbiddenException('You are not the owner of this order');
    }

    try {
      await this.orderService.markCancelled(orderNumber);
    } catch {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const orderEntities = await this.orderService.getOrdersByOrderNumber(orderNumber);

    const orderVo = OrderVo.fromEntity(orderEntities);

    orderVo.price = await this.orderService.getPriceByOrder(orderNumber);

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
  @Auth([RoleType.USER])
  async getOrderByUserId(@AuthUser() user: UserEntity): Promise<ResponseVo<OrderVo[]>> {
    // the result may contains different orders
    const orderEntities = await this.orderService.getOrdersByUserId(user.id);

    // grouped order base on the order number
    const groupedOrder = _.toArray(_.groupBy(orderEntities, 'orderNumber'));

    const orderVo = groupedOrder.map((orders: OrderEntity[]) => {
      return OrderVo.fromEntity(orders);
    });

    return ResponseVo.Success(orderVo);
  }
}

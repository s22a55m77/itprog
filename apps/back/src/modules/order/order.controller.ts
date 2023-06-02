import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import { AddOrderDto } from './dto/add-order.dto';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderVo } from './vo/order.vo';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  @Post('add-order')
  async addOrder(@Body() addOrderDto: AddOrderDto) {
    const orderNumber: string = new Date().toISOString();

    const orderVoArr: OrderVo[] = await Promise.all(
      addOrderDto.dishes.map(async (dish) => {
        const order = new OrderEntity();
        order.dishId = dish.id;
        order.orderNumber = orderNumber;
        order.userId = 1;
        order.quantity = dish.quantity;

        const insertedOrderEntity = await this.orderService.addOrder(order);

        return OrderVo.fromEntity(insertedOrderEntity);
      }),
    );

    return ResponseVo.Success(orderVoArr);
  }
}

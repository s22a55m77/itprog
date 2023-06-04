import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { OrderStatus } from '../../../constants';
import { OrderEntity } from '../order.entity';

class OrderDetailsVo {
  @ApiProperty()
  dishId: number;

  @ApiProperty()
  quantity: number;
}

export class OrderVo {
  @ApiProperty()
  orderNumber: string;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ type: OrderDetailsVo, isArray: true })
  details: OrderDetailsVo[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  combo: string;

  static fromEntity(order: OrderEntity | OrderEntity[]): OrderVo {
    if (order instanceof OrderEntity && !Array.isArray(order)) {
      const orderDetailsVo = Builder<OrderDetailsVo>()
        .dishId(order.dishId)
        .quantity(order.quantity)
        .build();

      return Builder<OrderVo>()
        .orderNumber(order.orderNumber)
        .status(order.status)
        .details([orderDetailsVo])
        .build();
    }

    if (Array.isArray(order)) {
      const orderDetailsVo = order.map((singleOrder: OrderEntity): OrderDetailsVo => {
        return Builder<OrderDetailsVo>()
          .dishId(singleOrder.dishId)
          .quantity(singleOrder.quantity)
          .build();
      });

      return Builder<OrderVo>()
        .orderNumber(order[0].orderNumber as string)
        .status(order[0].status as OrderStatus)
        .details(orderDetailsVo)
        .build();
    }

    return new OrderVo();
  }
}

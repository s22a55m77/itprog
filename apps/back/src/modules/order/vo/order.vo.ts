import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { OrderStatus } from '../../../constants';
import type { OrderEntity } from '../order.entity';

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

  @ApiPropertyOptional({
    description: 'Will not have combo name if there is no combo',
  })
  combo?: string;

  static fromEntity(order: OrderEntity, combo?: string): OrderVo {
    const orderDetailsVo: OrderDetailsVo[] = order.orderDetail.map((orderDetail) => {
      return Builder<OrderDetailsVo>()
        .dishId(orderDetail.dishId)
        .quantity(orderDetail.quantity)
        .build();
    });

    return Builder<OrderVo>()
      .orderNumber(order.orderNumber)
      .status(order.status)
      .price(order.price)
      .details(orderDetailsVo)
      .combo(combo)
      .build();
  }
}

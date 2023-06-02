import { ApiProperty } from '@nestjs/swagger';

import { OrderStatus } from '../../../constants';
import type { OrderEntity } from '../order.entity';

export class OrderVo {
  @ApiProperty()
  orderNumber: string;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  static fromEntity(order: OrderEntity): OrderVo {
    const orderVo = new OrderVo();

    orderVo.orderNumber = order.orderNumber;
    orderVo.status = order.status;

    return orderVo;
  }
}

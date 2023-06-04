import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>) {}

  async addOrder(orderEntity: OrderEntity) {
    const result = await this.orderRepository.insert(orderEntity);

    return this.orderRepository.findOneOrFail({
      where: {
        id: Number(result.identifiers[0].id),
      },
    });
  }

  async addOrderBatch(orderEntities: OrderEntity[]): Promise<OrderEntity[]> {
    const insertedOrderEntities: OrderEntity[] = [];

    await this.orderRepository.manager.transaction(async (transactionalEntityManager) => {
      await Promise.allSettled(
        orderEntities.map(async (orderEntity) => {
          const insertedOrderEntity = await transactionalEntityManager.save(
            OrderEntity,
            orderEntity,
          );

          insertedOrderEntities.push(insertedOrderEntity);
        }),
      );
    });

    return insertedOrderEntities;
  }

  getOrdersByUserId(userId: number) {
    return this.orderRepository.find({
      where: {
        userId,
      },
    });
  }
}

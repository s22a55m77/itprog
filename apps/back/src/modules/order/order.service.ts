import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ComboService } from '../combo/combo.service';
import { DishService } from '../dish/dish.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    private dishService: DishService,
    private comboService: ComboService,
  ) {}

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

  async getPriceByOrder(orderNumber: string) {
    const orders = await this.orderRepository.find({
      where: {
        orderNumber,
      },
    });

    const dishIds = _.map(orders, 'dishId');

    // get all dishes of current order
    const dishEntitites = await Promise.all(
      dishIds.map(async (id) => {
        return this.dishService.getDishById(id);
      }),
    );

    let price = 0;

    // the max quantity
    const n = _.maxBy(orders, 'quantity')!.quantity;

    // Get the Combo according to dishes
    const combo = await this.comboService.getComboByDishes(dishIds);

    // If there is a combo
    if (combo) {
      for (let i = 0; i < n; i++) {
        // this statement checks if there the dishes can make a combo,
        // to avoid that there is an extra item
        if (orders.filter((order) => order.quantity !== 0).length === orders.length) {
          // the array that will store the price of each items
          const priceArr: number[] = [];

          dishEntitites.forEach((dish) => {
            priceArr.push(dish.price);
          });

          price += _.sum(priceArr) * 0.9;

          orders.forEach((order) => (order.quantity -= 1));
        } else {
          // get the dishes that are not 0
          const notEmptyDish = orders.filter((order) => order.quantity !== 0);

          notEmptyDish.forEach((dish) => {
            // add dishes price
            price += _.find(dishEntitites, { id: dish.dishId })!.price;

            orders.forEach((order) => (order.quantity -= 1));
          });
        }
      }
    }

    // there is no combo
    if (!combo) {
      for (let i = 0; i < n; i++) {
        const notEmptyDish = orders.filter((dish) => dish.quantity !== 0);

        notEmptyDish.forEach((dish) => {
          // add dishes price
          price += _.find(dishEntitites, { id: dish.dishId })!.price;

          orders.forEach((order) => (order.quantity -= 1));
        });
      }
    }

    return price;
  }
}

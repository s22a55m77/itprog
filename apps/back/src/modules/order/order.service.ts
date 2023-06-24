import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { OrderStatus } from '../../constants';
import { ComboService } from '../combo/combo.service';
import { DishService } from '../dish/dish.service';
import { OrderEntity } from './order.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailRepository: Repository<OrderDetailEntity>,
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    private dishService: DishService,
    private comboService: ComboService,
  ) {}

  async addOrder(orderEntity: OrderEntity): Promise<OrderEntity> {
    const result = await this.orderRepository.save(orderEntity);

    return this.orderRepository.findOneOrFail({
      where: {
        orderNumber: result.orderNumber,
      },
    });
  }

  getOrderByUserId(userId: number) {
    return this.orderRepository.find({
      where: {
        userId,
      },
    });
  }

  async getPriceByOrderDetail(orderDetail: OrderDetailEntity[]): Promise<number> {
    const dishIds: number[] = [];

    // get all dishes of current order
    const dishEntities = await Promise.all(
      orderDetail.map(async (singleOrder) => {
        dishIds.push(singleOrder.dishId);

        return this.dishService.getDishById(singleOrder.dishId);
      }),
    );

    let price = 0;

    // the max quantity
    const n = _.maxBy(orderDetail, 'quantity')!.quantity;

    // Get the Combo according to dishes
    const combo = await this.comboService.getComboByDishes(dishIds);

    // If there is a combo
    if (combo) {
      for (let i = 0; i < n; i++) {
        // this statement checks if there the dishes can make a combo,
        // to avoid that there is an extra item
        if (orderDetail.filter((order) => order.quantity !== 0).length === orderDetail.length) {
          // the array that will store the price of each items
          const priceArr: number[] = [];

          dishEntities.forEach((dish) => {
            priceArr.push(dish.price);
          });

          price += _.sum(priceArr) * ((100 - combo.discount) * 0.01);

          orderDetail.forEach((order) => (order.quantity -= 1));
        } else {
          // get the dishes that are not 0
          const notEmptyDish = orderDetail.filter((order) => order.quantity !== 0);

          notEmptyDish.forEach((dish) => {
            // add dishes price
            price += _.find(dishEntities, { id: dish.dishId })!.price;

            orderDetail.forEach((order) => (order.quantity -= 1));
          });
        }
      }
    }

    // there is no combo
    if (!combo) {
      const notEmptyDish = orderDetail.filter((dish) => dish.quantity !== 0);

      notEmptyDish.forEach((dish) => {
        // add dishes price
        price += _.find(dishEntities, { id: dish.dishId })!.price * dish.quantity;
      });
    }

    return price;
  }

  getOrderByOrderNumber(orderNumber: string): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: {
        orderNumber,
      },
    });
  }

  async getComboNameByOrderNumber(orderNumber: string): Promise<string | undefined> {
    const order = await this.orderRepository.findOne({
      where: {
        orderNumber,
      },
    });

    if (!order) {
      throw new NotFoundException('No such order');
    }

    if (order.comboId === undefined) {
      return undefined;
    }

    const combo = await this.comboService.getComboById(order.comboId);

    return combo?.name;
  }

  async addPayment(orderNumber: string, change: number) {
    await this.orderRepository.update(
      { orderNumber },
      { status: OrderStatus.COMPLETED, change, completedAt: new Date() },
    );
  }

  async markCancelled(orderNumber: string) {
    await this.orderRepository.update({ orderNumber }, { status: OrderStatus.CANCELLED });
  }
}

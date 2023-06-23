import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DishEntity } from '../dish/dish.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order-details' })
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    primaryKeyConstraintName: 'PK_orderDetails_id',
  })
  id: number;

  @ManyToOne(() => OrderEntity, (orderEntity) => orderEntity.orderDetail)
  @JoinColumn({
    name: 'order_number',
    referencedColumnName: 'orderNumber',
    foreignKeyConstraintName: 'FK_orderDetails_orderNumber_orders_orderNumber',
  })
  order: OrderEntity;

  @Column({ type: 'varchar' })
  orderNumber: string;

  @ManyToOne(() => DishEntity, (dishEntity) => dishEntity.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'dish_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_orderDetails_dishId_dishes_id',
  })
  dish: DishEntity;

  @Column({ type: 'int' })
  dishId: number;

  @Column({ type: 'int' })
  quantity: number;
}

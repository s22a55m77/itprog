import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderStatus } from '../../constants';
import { DishEntity } from '../dish/dish.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', primaryKeyConstraintName: 'PK_orders_id' })
  id: number;

  @Column({ type: 'varchar' })
  orderNumber: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_orders_userId_users_id',
  })
  user: UserEntity;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => DishEntity, (dishEntity) => dishEntity.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'dish_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_orders_dishId_dishes_id',
  })
  dish: DishEntity;

  @Column({ type: 'int' })
  dishId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_PAYMENT })
  status: OrderStatus;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  completedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}

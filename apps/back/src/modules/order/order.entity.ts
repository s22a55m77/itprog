import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderStatus } from '../../constants';
import { ComboEntity } from '../combo/combo.entity';
import { UserEntity } from '../user/user.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryColumn({ type: 'varchar' })
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

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_PAYMENT })
  status: OrderStatus;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float', nullable: true })
  change: number;

  @ManyToOne(() => ComboEntity, (comboEntity) => comboEntity.id)
  @JoinColumn({
    name: 'combo_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_orders_comboId_combos_id',
  })
  combo?: ComboEntity;

  @Column({ type: 'int', nullable: true })
  comboId?: number;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order, {
    cascade: true,
    eager: true,
  })
  orderDetail: OrderDetailEntity[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  completedAt: Date;
}

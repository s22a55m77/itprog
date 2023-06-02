import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleType } from '../../constants';
import { OrderEntity } from '../order/order.entity';

export interface IUserEntity {
  role: RoleType;

  username?: string;

  password?: string;
}

@Entity({ name: 'users' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', primaryKeyConstraintName: 'PK_users_id' })
  id: number;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.user)
  orders: OrderEntity[];
}

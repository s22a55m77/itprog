import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleType } from '../../constants';

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
}

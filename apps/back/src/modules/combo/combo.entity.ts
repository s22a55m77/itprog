import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DishEntity } from '../dish/dish.entity';
import { OrderEntity } from '../order/order.entity';

@Entity({ name: 'combos' })
export class ComboEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', primaryKeyConstraintName: 'PK_combos_id' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => DishEntity, (dishEntity) => dishEntity.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'dish_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_combos_dishId_dishes_id',
  })
  dish: DishEntity;

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.combo)
  order: OrderEntity[];

  @Column({ type: 'int' })
  dishId: number;

  @Column({ type: 'float' })
  discount: number;
}

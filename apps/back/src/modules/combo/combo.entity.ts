import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DishEntity } from '../dish/dish.entity';

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

  @Column({ type: 'int' })
  dishId: number;

  @Column({ type: 'float' })
  discount: number;
}

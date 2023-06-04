import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DishEntity } from '../dish/dish.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    primaryKeyConstraintName: 'PK_categories_id',
  })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => DishEntity, (dishEntity) => dishEntity.category, {
    createForeignKeyConstraints: false,
  })
  dishes: DishEntity[];
}

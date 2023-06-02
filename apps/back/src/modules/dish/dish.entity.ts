import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from '../category/category.entity';
import { ComboEntity } from '../combo/combo.entity';
import { OrderEntity } from '../order/order.entity';

@Entity({ name: 'dishes' })
export class DishEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', primaryKeyConstraintName: 'PK_dishes_id' })
  id: number;

  @OneToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_dishes_categoryId_categories_id',
  })
  category: CategoryEntity;

  @OneToMany(() => ComboEntity, (comboEntity) => comboEntity.dish)
  combo: ComboEntity[];

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.dish)
  orders: OrderEntity[];

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'blob', nullable: true })
  image: string;
}

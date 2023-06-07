import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import type { DishEntity } from '../../dish/dish.entity';

export class DishIdVo {
  @ApiProperty()
  id: number;

  public static fromEntity(dishes: DishEntity[]): DishIdVo[] {
    return dishes.map((dish: DishEntity) => {
      return Builder<DishIdVo>().id(dish.id).build();
    });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import type { DishEntity } from '../dish.entity';

export class DishesVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  public static fromEntity(dishes: DishEntity[]): DishesVo[] {
    return dishes.map((dish) => {
      return Builder<DishesVo>()
        .id(dish.id)
        .name(dish.name)
        .price(dish.price)
        .image(dish.image)
        .build();
    });
  }
}

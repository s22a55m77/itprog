import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import type { DishEntity } from '../dish.entity';

export class DishVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  public static fromEntity(dish: DishEntity): DishVo {
    return Builder<DishVo>()
      .id(dish.id)
      .name(dish.name)
      .description(dish.description)
      .price(dish.price)
      .image(dish.image)
      .build();
  }
}

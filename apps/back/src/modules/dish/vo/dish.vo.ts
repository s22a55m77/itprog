import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  image?: string;

  public static fromEntity(dish: DishEntity, image: boolean): DishVo {
    const builder = Builder<DishVo>()
      .id(dish.id)
      .name(dish.name)
      .description(dish.description)
      .price(dish.price);

    if (image) {
      builder.image(dish.image);
    }

    return builder.build();
  }
}

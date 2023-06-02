import { ApiProperty } from '@nestjs/swagger';

import type { DishEntity } from '../dish.entity';

export class DishesVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  public static fromEntity(dishes: DishEntity[]): DishesVo[] {
    const dishesVoArr: DishesVo[] = [];

    dishes.forEach((dish) => {
      dishesVoArr.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
      });
    });

    return dishesVoArr;
  }
}

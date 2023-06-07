import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DishEntity } from './dish.entity';

@Injectable()
export class DishService {
  constructor(@InjectRepository(DishEntity) private dishRepository: Repository<DishEntity>) {}

  getDishById(dishId: number): Promise<DishEntity> {
    return this.dishRepository
      .findOneOrFail({
        where: {
          id: dishId,
        },
      })
      .catch(() => {
        throw new NotFoundException('No such dish');
      });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DishEntity } from './dish.entity';

@Injectable()
export class DishService {
  constructor(@InjectRepository(DishEntity) private dishRepository: Repository<DishEntity>) {}

  getDishesFromCategory(categoryId: number): Promise<DishEntity[]> {
    return this.dishRepository.find({
      where: {
        categoryId,
      },
    });
  }
}

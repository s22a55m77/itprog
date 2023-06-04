import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
  ) {}

  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  getCategoryById(id: number) {
    return this.categoryRepository
      .findOneOrFail({
        where: {
          id,
        },
      })
      .catch((error: Error) => {
        if (error.name === 'EntityNotFoundError') {
          throw new NotFoundException('No such category');
        }
      });
  }
}

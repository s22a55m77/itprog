import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { DishController } from './dish.controller';
import { DishEntity } from './dish.entity';
import { DishService } from './dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity, CategoryEntity])],
  controllers: [DishController],
  exports: [DishService],
  providers: [DishService, CategoryService],
})
export class DishModule {}

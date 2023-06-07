import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import type { DishEntity } from '../dish/dish.entity';
import { CategoryService } from './category.service';
import { CategoryVo } from './vo/category.vo';
import { DishIdVo } from './vo/dish-id.vo';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get All Categories',
  })
  @ApiResponse({
    type: CategoryVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  async getCategories(): Promise<ResponseVo<CategoryVo[]>> {
    const categoryEntities = await this.categoryService.getCategories();

    const categoryVo = CategoryVo.fromEntity(categoryEntities);

    return ResponseVo.Success(categoryVo);
  }

  @ApiOperation({
    summary: 'Get Dishes from category id',
  })
  @ApiResponse({
    type: DishIdVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  @Get('/:categoryId/dishes')
  async getCategoryDishes(
    @Param('categoryId') categoryId: number,
  ): Promise<ResponseVo<DishIdVo[]>> {
    await this.categoryService.getCategoryById(categoryId);

    const dishes: DishEntity[] = await this.categoryService.getDishesFromCategory(categoryId);

    return ResponseVo.Success(DishIdVo.fromEntity(dishes));
  }
}

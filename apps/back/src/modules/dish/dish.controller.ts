import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import { CategoryService } from '../category/category.service';
import type { DishEntity } from './dish.entity';
import { DishService } from './dish.service';
import { DishesVo } from './vo/Dishes.vo';

@Controller('dish')
@ApiTags('Dish')
export class DishController {
  constructor(private dishService: DishService, private categoryService: CategoryService) {}

  @Get('/:categoryId')
  @ApiResponse({
    type: DishesVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  async getDishesFromCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<ResponseVo<DishesVo[]>> {
    await this.categoryService.getCategoryById(categoryId);

    const dishes: DishEntity[] = await this.dishService.getDishesFromCategory(categoryId);

    return ResponseVo.Success(DishesVo.fromEntity(dishes));
  }
}

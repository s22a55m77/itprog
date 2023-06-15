import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import { CategoryService } from '../category/category.service';
import type { DishEntity } from './dish.entity';
import { DishService } from './dish.service';
import { DishVo } from './vo/dish.vo';

@Controller('dish')
@ApiTags('Dish')
export class DishController {
  constructor(private dishService: DishService, private categoryService: CategoryService) {}

  @Get('/:dishId')
  @ApiOperation({
    summary: 'Get dish by ID',
  })
  @ApiResponse({
    type: DishVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: false,
    },
  })
  async getDishesFromCategory(
    @Param('dishId') dishId: number,
    @Query('image') image: boolean,
  ): Promise<ResponseVo<DishVo>> {
    const dish: DishEntity = await this.dishService.getDishById(dishId);

    return ResponseVo.Success(DishVo.fromEntity(dish, image));
  }
}

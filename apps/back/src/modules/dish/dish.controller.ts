import { Controller, Get, Header, HttpStatus, Param, Query, StreamableFile } from '@nestjs/common';
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

  @Get('/:dishId/image')
  @Header('Content-Type', 'image/jpeg')
  @ApiOperation({
    summary: 'Get dish image by ID',
  })
  async getDishImageById(@Param('dishId') dishId: number): Promise<StreamableFile> {
    const dish: DishEntity = await this.dishService.getDishById(dishId);

    const data = dish.image.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const imageBuffer = Buffer.from(data, 'base64');

    return new StreamableFile(imageBuffer);
  }
}

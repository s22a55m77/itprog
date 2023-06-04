import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseVo } from '../../common/vo/response.vo';
import { ApiResponse } from '../../decorators';
import { CategoryService } from './category.service';
import { CategoryVo } from './vo/category.vo';

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
}

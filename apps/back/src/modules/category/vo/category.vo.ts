import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import type { CategoryEntity } from '../category.entity';

export class CategoryVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  public static fromEntity(categoryEntities: CategoryEntity[]): CategoryVo[] {
    return categoryEntities.map((categoryEntity) => {
      return Builder<CategoryVo>().id(categoryEntity.id).name(categoryEntity.name).build();
    });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class DishDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class AddOrderDto {
  @ApiProperty({ type: DishDto, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => DishDto)
  dishes: DishDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

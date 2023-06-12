import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class PriceVo {
  @ApiProperty()
  price: number;

  public static fromNumber(price: number): PriceVo {
    return Builder<PriceVo>().price(price).build();
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class ResponseVo<T> {
  @ApiProperty()
  msg: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  data: T;

  @ApiProperty()
  success: boolean;

  constructor(data?: T) {
    if (data) {
      this.data = data;
      this.success = true;
    }
  }

  public Success(data: T): ResponseVo<T> {
    this.data = data;
    this.success = true;

    return this;
  }

  public Error(e: Error): ResponseVo<T> {
    this.error = e.name;
    this.success = false;

    return this;
  }
}

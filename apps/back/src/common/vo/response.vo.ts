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

  public static Success<T>(data: T): ResponseVo<T> {
    const responseVo = new ResponseVo<T>();

    responseVo.data = data;
    responseVo.success = true;

    return responseVo;
  }

  public Error(e: Error): ResponseVo<T> {
    const responseVo = new ResponseVo<T>();

    responseVo.error = e.name;
    responseVo.success = false;

    return responseVo;
  }
}

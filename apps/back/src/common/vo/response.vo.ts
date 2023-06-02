import { ApiProperty } from '@nestjs/swagger';

export class ResponseVo<T> {
  @ApiProperty()
  msg: string | null;

  @ApiProperty()
  error: string | null;

  @ApiProperty()
  data: T | null;

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

    responseVo.msg = null;
    responseVo.error = null;
    responseVo.data = data;
    responseVo.success = true;

    return responseVo;
  }

  public static Error(e: Error): ResponseVo<null> {
    const responseVo = new ResponseVo<null>();

    responseVo.data = null;
    responseVo.msg = e.message;
    responseVo.error = e.name;
    responseVo.success = false;

    return responseVo;
  }
}

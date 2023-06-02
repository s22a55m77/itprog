import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';

import { ResponseVo } from '../common/vo/response.vo';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(status).json(ResponseVo.Error(exception));
  }
}

import type { HttpStatus, Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiExtraModels, ApiResponse as SwaggerApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseVo } from '../common/vo/response.vo';

export function ApiResponse<T extends Type>(options: {
  type: T;
  description?: string;
  httpStatus: HttpStatus;
  options?: ApiResponseOptions;
}): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(ResponseVo),
    ApiExtraModels(options.type),
    SwaggerApiResponse({
      status: Number(options.httpStatus),
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseVo) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
      ...options.options,
    }),
  );
}

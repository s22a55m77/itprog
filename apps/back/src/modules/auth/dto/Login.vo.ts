import { ApiProperty } from '@nestjs/swagger';

import { UserVo } from '../../user/dtos/user.vo';
import { TokenVo } from './Token.vo';

export class LoginVo {
  @ApiProperty({ type: UserVo })
  user: UserVo;

  @ApiProperty({ type: TokenVo })
  token: TokenVo;

  constructor(user: UserVo, token: TokenVo) {
    this.user = user;
    this.token = token;
  }
}

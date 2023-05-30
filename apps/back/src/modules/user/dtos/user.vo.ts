import { ApiProperty } from '@nestjs/swagger';

import { RoleType } from '../../../constants';
import type { UserEntity } from '../user.entity';

export class UserVo {
  constructor(userEntity: UserEntity) {
    this.username = userEntity.username;
  }

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: RoleType })
  role: RoleType;
}

import { ApiProperty } from '@nestjs/swagger';

import { RoleType } from '../../../constants';
import type { UserEntity } from '../user.entity';

export class UserVo {
  @ApiProperty()
  username: string;

  @ApiProperty({ enum: RoleType })
  role: RoleType;

  public static fromEntity(userEntity: UserEntity): UserVo {
    const userVo = new UserVo();
    userVo.username = userEntity.username;
    userVo.role = userEntity.role;

    return userVo;
  }
}

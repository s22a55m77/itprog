import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils';
import type { RoleType } from '../../constants';
import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import type { UserLoginDto } from './dto/UserLogin.dto';
import { TokenVo } from './vo/Token.vo';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: { role: RoleType; userId: number }): Promise<TokenVo> {
    return new TokenVo({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      username: userLoginDto.username,
    });

    const isPasswordValid = await validateHash(userLoginDto.password, user?.password);

    if (!isPasswordValid) {
      throw new NotFoundException('No such user');
    }

    return user!;
  }
}

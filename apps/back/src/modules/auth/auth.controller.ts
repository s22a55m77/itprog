import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { ResponseVo } from '../../common/vo/response.vo';
import { RoleType } from '../../constants';
import { ApiResponse, Auth, AuthUser } from '../../decorators';
import { UserVo } from '../user/dtos/user.vo';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/UserLogin.dto';
import { UserRegisterDto } from './dto/UserRegister.dto';
import { LoginVo } from './vo/Login.vo';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginVo,
    description: 'User info with access token',
    httpStatus: HttpStatus.OK,
  })
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<ResponseVo<LoginVo>> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    const loginVo = Builder<LoginVo>().user(UserVo.fromEntity(userEntity)).token(token).build();

    return ResponseVo.Success<LoginVo>(loginVo);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserVo, description: 'Successfully Registered', httpStatus: HttpStatus.OK })
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<ResponseVo<UserVo>> {
    const user = await this.userService.findOne({ username: userRegisterDto.username });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const createdUser = await this.userService.createUser(userRegisterDto);

    return ResponseVo.Success<UserVo>(UserVo.fromEntity(createdUser));
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiResponse({ type: UserVo, description: 'current user info', httpStatus: HttpStatus.OK })
  getCurrentUser(@AuthUser() user: UserEntity): ResponseVo<UserVo> {
    return ResponseVo.Success<UserVo>(UserVo.fromEntity(user));
  }
}

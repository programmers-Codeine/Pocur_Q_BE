import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('join')
  async join(@Body() joinDto: CreateUserDto): Promise<void> {
    return this.userService.join(joinDto);
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Body() loginDto: LoginUserDto,
  ): Promise<{ message: string; isFirstLogin: boolean }> {
    const { accessToken, isFirstLogin } = await this.userService.login(loginDto);

    request.res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60, // 1시간
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: '로그인 성공',
      isFirstLogin,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('jwtReissue')
  @HttpCode(HttpStatus.OK)
  async customerJwt(@Req() request: Request, @Body() body: { restaurantId: string }): Promise<any> {
    const user = request.user as JwtPayload;
    const userId = user.userId;
    const { restaurantId } = body;
    const accessToken = await this.userService.jwtReissue(restaurantId, userId);

    request.res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60, // 1시간
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: '관리자 jwt 재발급 성공',
    };
  }
}

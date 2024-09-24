import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('join')
  async join(@Body() joinDto: CreateUserDto): Promise<void> {
    return this.userService.join(joinDto);
  }

  @Post('login')
  async login(@Req() request: Request, @Body() loginDto: LoginUserDto): Promise<{ message: string }> {
    const { accessToken } = await this.userService.login(loginDto);

    request.res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60, // 1시간
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: '로그인 성공',
    };
  }
}

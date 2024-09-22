import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('join')
  async join(@Body() joinData: JoinDto): Promise<void> {
    return this.userService.join(joinData);
  }

  @Post('login')
  async login(@Res() response: Response, @Body() loginDto: LoginUserDto): Promise<any> {
    const { accessToken } = await this.userService.login(loginDto);

    response.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60, // 1시간
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    response.status(200).send({ message: '로그인 성공' });
  }
}

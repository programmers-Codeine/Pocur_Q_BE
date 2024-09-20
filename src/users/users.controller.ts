import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login-user.dto';
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
  async login(@Res() response: Response, @Body() loginData: LoginDto): Promise<any> {
    const jwt = await this.userService.login(loginData);

    response.cookie('accessToken', jwt.accessToken, {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    response.status(200).send({ message: '로그인 성공' });
  }
}

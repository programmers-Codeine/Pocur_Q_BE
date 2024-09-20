import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login-user.dto';

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
  async login(@Body() loginData: LoginDto): Promise<{ accessToken: string }> {
    const jwt = await this.userService.login(loginData);
    return { accessToken: jwt.accessToken };
  }
}

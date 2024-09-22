import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('join')
  async join(@Body() joinDto: CreateUserDto): Promise<void> {
    return this.userService.join(joinDto);
  }

  //TODO: POST login
}

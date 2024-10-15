import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CustomerJwtService } from './customer-jwt.service';

@Controller('customerJwt')
export class CustomerJwtController {
  constructor(private readonly customerJwtService: CustomerJwtService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async customerJwt(@Req() request: Request, @Body() body: { restaurantId: string; tableNum: number }): Promise<any> {
    const { restaurantId, tableNum } = body;
    const accessToken = await this.customerJwtService.customerJwt(restaurantId, tableNum);

    request.res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 30, // 30분
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: '소비자 인증 발행',
    };
  }
}

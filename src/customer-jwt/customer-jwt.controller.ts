import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CustomerJwtService } from './customer-jwt.service';

@Controller('customerJwt')
export class CustomerJwtController {
  constructor(private readonly customerJwtService: CustomerJwtService) {}
  @Post()
  async customerJwt(@Req() request: Request, @Body() body: { restaurantId: string; tableNum: number }): Promise<any> {
    const { restaurantId, tableNum } = body;
    const { customerToken } = await this.customerJwtService.customerJwt(restaurantId, tableNum);

    request.res.cookie('customerToken', customerToken, {
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

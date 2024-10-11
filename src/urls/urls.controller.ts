import { Controller, Get, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './entities/urls.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  async getUrls(@Request() req): Promise<Url[]> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.urlsService.getUrls(restaurantId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

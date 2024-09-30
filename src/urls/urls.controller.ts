import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './entities/urls.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  async getUrlsByRestaurant(@Request() req): Promise<Url[]> {
    const restaurantId = req.user.restaurantId;

    return this.urlsService.findUrlsByRestaurantId(restaurantId);
  }
}

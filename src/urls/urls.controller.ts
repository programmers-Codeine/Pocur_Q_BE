import { Controller, Get, Request } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './entities/urls.entity';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  async getUrlsByRestaurant(@Request() req): Promise<Url[]> {
    const restaurantId = req.user.restaurantId;

    return this.urlsService.findUrlsByRestaurantId(restaurantId);
  }
}

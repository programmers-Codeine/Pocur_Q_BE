import { Controller, Get, Param } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './entities/urls.entity';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':restaurant_id')
  async getUrlsByRestaurant(@Param('restaurant_id') restaurantId: string): Promise<Url[]> {
    return this.urlsService.findUrlsByRestaurantId(restaurantId);
  }
}

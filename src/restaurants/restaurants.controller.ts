import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly appService: RestaurantsService) {}

  @Get()
  getHello(): string {
    return this.appService.getRestaurants();
  }
}

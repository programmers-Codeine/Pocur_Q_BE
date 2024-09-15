import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getRestaurants(): string {
    return this.restaurantsService.getRestaurants();
  }
}

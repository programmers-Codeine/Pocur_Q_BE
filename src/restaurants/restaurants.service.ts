import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  getRestaurants(): string {
    return 'RestaurantsService';
  }
}

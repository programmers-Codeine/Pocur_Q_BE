import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Module({
  providers: [RestaurantsService],
  controllers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantTable])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { Url } from 'src/urls/entities/urls.entity';
import { UrlsService } from 'src/urls/urls.service';
import { Order } from 'src/orders/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantTable, Url, Order])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, UrlsService],
  exports: [RestaurantsService, RestaurantsModule],
})
export class RestaurantsModule {}

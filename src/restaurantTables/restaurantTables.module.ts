import { Module } from '@nestjs/common';
import { RestaurantTablesController } from './restaurantTables.controller';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { UrlsService } from 'src/urls/urls.service';
import { Url } from 'src/urls/entities/urls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTable, Restaurant, Url])],
  controllers: [RestaurantTablesController],
  providers: [RestaurantTablesService, UrlsService],
  exports: [RestaurantTablesService],
})
export class RestaurantTablesModule {}

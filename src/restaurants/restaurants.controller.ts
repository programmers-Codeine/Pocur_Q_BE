import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get(':restaurant_id')
  async getRestaurant(@Param('restaurant_id') restaurantId: string): Promise<Restaurant> {
    return await this.restaurantsService.getRestaurantById(restaurantId);
  }

  @Post(':user_id')
  async createRestaurant(
    @Param('user_id') userId: string,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantsService.createRestaurant(userId, createRestaurantDto);
  }

  @Put(':restaurant_id')
  async updateRestaurant(
    @Param('restaurant_id') restaurantId: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantsService.updateRestaurant(restaurantId, updateRestaurantDto);
  }
}

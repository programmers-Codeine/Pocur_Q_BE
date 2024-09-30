import { Controller, Get, Post, Body, Put, UseGuards, Request } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRestaurant(@Request() req): Promise<Restaurant> {
    const restaurantId = req.user.restaurantId;

    return await this.restaurantsService.getRestaurantById(restaurantId);
  }

  @Post()
  async createRestaurant(@Request() req, @Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const userId = req.user.userId;
    return await this.restaurantsService.createRestaurant(userId, createRestaurantDto);
  }

  @Put()
  async updateRestaurant(@Request() req, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurantId = req.user.restaurantId;

    return await this.restaurantsService.updateRestaurant(restaurantId, updateRestaurantDto);
  }
}

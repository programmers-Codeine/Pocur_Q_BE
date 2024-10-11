import { Controller, Get, Post, Body, Put, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getRestaurant(@Request() req): Promise<Restaurant> {
    const restaurantId = req.user.restaurantId;

    return await this.restaurantsService.getRestaurantById(restaurantId);
  }

  @Post()
  async createRestaurant(@Request() req, @Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    if (req.user.type === 'login') {
      const userId = req.user.userId;

      return await this.restaurantsService.createRestaurant(userId, createRestaurantDto);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Put()
  async updateRestaurant(@Request() req, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return await this.restaurantsService.updateRestaurant(restaurantId, updateRestaurantDto);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

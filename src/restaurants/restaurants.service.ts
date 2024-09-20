import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async getRestaurantById(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }
    return restaurant;
  }

  async createRestaurant(userId: string, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      user_id: userId,
    });
    return await this.restaurantRepository.save(newRestaurant);
  }

  async updateRestaurant(restaurantId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    Object.assign(restaurant, updateRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }
}

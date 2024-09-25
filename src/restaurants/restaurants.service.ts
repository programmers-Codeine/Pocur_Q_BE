import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { UrlsService } from 'src/urls/urls.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,

    private readonly urlsService: UrlsService,
  ) {}

  async getRestaurantById(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    return restaurant;
  }

  async createRestaurant(userId: string, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    // 1. Restaurant 엔티티 생성
    const newRestaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      user_id: userId,
      total_table_count: createRestaurantDto.default_table_count, // total_table_count는 default_table_count로 설정
    });

    // 2. Restaurant 저장
    const savedRestaurant = await this.restaurantRepository.save(newRestaurant);

    // 3. RestaurantTable 및 URL 엔티티들 생성 (1부터 default_table_count까지)
    const tableCount = createRestaurantDto.default_table_count;
    for (let i = 1; i <= tableCount; i++) {
      // 테이블 생성
      const newTable = this.restaurantTableRepository.create({
        restaurant: savedRestaurant,
        table_num: i,
      });
      await this.restaurantTableRepository.save(newTable); // 테이블 저장

      // URL 생성
      await this.urlsService.createUrl(savedRestaurant, i); // URL 저장
    }

    return savedRestaurant;
  }

  async updateRestaurant(restaurantId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    const newRestaurant = { ...restaurant, ...updateRestaurantDto };
    return await this.restaurantRepository.save(newRestaurant);
  }
}

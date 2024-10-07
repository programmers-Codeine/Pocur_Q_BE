import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantDto } from './dto/update-restaurants.dto';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { UrlsService } from 'src/urls/urls.service';
import { Users } from 'src/users/entities/users.entity';
import { DesignPreset } from 'src/designPresets/entities/designPresets.entity';
import { Design } from 'src/designs/entities/designs.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,

    @InjectRepository(DesignPreset)
    private readonly designPresetRepository: Repository<DesignPreset>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>,

    private readonly urlsService: UrlsService,
  ) {}

  async getRestaurantById(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    return restaurant;
  }

  async createRestaurant(userId: string, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`ID가 ${userId}인 사용자를 찾을 수 없습니다.`);
    }

    const newRestaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      user,
      totalTableCount: createRestaurantDto.defaultTableCount,
    });

    const savedRestaurant = await this.restaurantRepository.save(newRestaurant);

    const tableCount = createRestaurantDto.defaultTableCount;
    for (let i = 1; i <= tableCount; i++) {
      const newTable = this.restaurantTableRepository.create({
        restaurant: savedRestaurant,
        table_num: i,
      });
      await this.restaurantTableRepository.save(newTable);

      await this.urlsService.createUrl(savedRestaurant, i);
    }

    const newDesignPreset = this.designPresetRepository.create({
      restaurant: savedRestaurant,
      name: '기본 디자인',
    });
    const savedDesignPreset = await this.designPresetRepository.save(newDesignPreset);

    const newDesign = this.designRepository.create({
      restaurant: savedRestaurant,
      designPreset: savedDesignPreset,
    });
    await this.designRepository.save(newDesign);

    return savedRestaurant;
  }

  async updateRestaurant(restaurantId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    const newRestaurant = { ...restaurant, ...updateRestaurantDto };
    return await this.restaurantRepository.save(newRestaurant);
  }
}

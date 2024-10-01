import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { UrlsService } from 'src/urls/urls.service';

@Injectable()
export class RestaurantTablesService {
  constructor(
    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    private readonly urlsService: UrlsService,
  ) {}

  async getTables(restaurantId: string): Promise<RestaurantTable[]> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    return await this.restaurantTableRepository.find({
      where: { restaurant: { id: restaurantId } },
      order: { table_num: 'ASC' },
    });
  }

  async addTable(restaurantId: string): Promise<RestaurantTable> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    const lastTable = await this.restaurantTableRepository
      .createQueryBuilder('table')
      .where('table.restaurant_id = :restaurantId', { restaurantId })
      .orderBy('table.table_num', 'DESC')
      .getOne();

    const newTableNum = lastTable ? lastTable.table_num + 1 : 1;

    const newTable = this.restaurantTableRepository.create({
      restaurant,
      table_num: newTableNum,
    });

    const savedTable = await this.restaurantTableRepository.save(newTable);

    await this.urlsService.createUrl(restaurant, newTableNum);

    restaurant.totalTableCount += 1;
    await this.restaurantRepository.save(restaurant);

    return savedTable;
  }

  async removeTable(restaurantId: string): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    const lastTable = await this.restaurantTableRepository
      .createQueryBuilder('table')
      .where('table.restaurant_id = :restaurantId', { restaurantId })
      .orderBy('table.table_num', 'DESC')
      .getOne();

    if (lastTable.table_num <= restaurant.defaultTableCount) {
      throw new BadRequestException(
        `기본 테이블은 삭제 할 수 없습니다. 기본 테이블 수 : (${restaurant.defaultTableCount})`,
      );
    }

    await this.urlsService.deleteUrlByTableNumAndRestaurantId(restaurantId, lastTable.table_num);

    await this.restaurantTableRepository.remove(lastTable);

    restaurant.totalTableCount -= 1;
    await this.restaurantRepository.save(restaurant);
  }
}

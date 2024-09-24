import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Injectable()
export class RestaurantTablesService {
  constructor(
    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<RestaurantTable[]> {
    return await this.restaurantTableRepository.find({
      order: {
        table_num: 'ASC', // table_num을 기준으로 오름차순 정렬
      },
    });
  }

  async addTableWithNextTableNum(restaurantId: string): Promise<RestaurantTable> {
    // 1. 레스토랑이 존재하는지 확인
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    // 2. 해당 레스토랑의 가장 큰 table_num을 찾기
    const lastTable = await this.restaurantTableRepository
      .createQueryBuilder('table')
      .where('table.restaurant_id = :restaurantId', { restaurantId })
      .orderBy('table.table_num', 'DESC')
      .getOne();

    // 3. 가장 큰 table_num 값보다 1 큰 값을 새로운 테이블로 추가
    const newTableNum = lastTable ? lastTable.table_num + 1 : 1;

    const newTable = this.restaurantTableRepository.create({
      restaurant,
      table_num: newTableNum,
    });

    // 4. 새로운 테이블 저장
    return await this.restaurantTableRepository.save(newTable);
  }

  async removeTableWithMaxTableNum(restaurantId: string): Promise<void> {
    // 1. 레스토랑이 존재하는지 확인
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
    }

    // 2. 해당 레스토랑의 가장 큰 table_num을 찾기
    const lastTable = await this.restaurantTableRepository
      .createQueryBuilder('table')
      .where('table.restaurant_id = :restaurantId', { restaurantId })
      .orderBy('table.table_num', 'DESC')
      .getOne();

    // 3. 가장 큰 table_num이 존재하지 않으면 예외 발생
    if (!lastTable) {
      throw new NotFoundException(`No tables found for restaurant with ID ${restaurantId}`);
    }

    // 4. 가장 큰 table_num이 restaurant의 default_table_count와 동일하면 삭제 불가
    if (lastTable.table_num <= restaurant.default_table_count) {
      throw new BadRequestException(
        `기본 테이블은 삭제 할 수 없습니다. 기본 테이블 수 : (${restaurant.default_table_count})`,
      );
    }

    // 5. 가장 큰 테이블 삭제
    await this.restaurantTableRepository.remove(lastTable);
  }
}

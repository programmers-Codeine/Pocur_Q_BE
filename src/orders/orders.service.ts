import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menus } from 'src/menus/entities/menus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Menus)
    private menusRepository: Repository<Menus>,

    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,

    @InjectRepository(RestaurantTable)
    private restaurantTableRepository: Repository<RestaurantTable>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, restaurant_id: string, restaurantTable_id: string): Promise<Order> {
    const { menu_id, count } = createOrderDto;

    // 메뉴를 찾음
    const menu = await this.menusRepository.findOne({ where: { id: menu_id } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    // 레스토랑을 찾음
    const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurant_id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // 테이블을 찾음
    const restaurantTable = await this.restaurantTableRepository.findOne({ where: { id: restaurantTable_id } });
    if (!restaurantTable) {
      throw new NotFoundException('Restaurant Table not found');
    }

    // 총 가격 계산 (메뉴 가격 * 수량)
    const total_price = menu.price * count;

    // 주문 생성
    const order = this.ordersRepository.create({
      menu,
      count,
      total_price,
      ordered_at: new Date(),
      restaurant,
      restaurantTable,
    });

    return this.ordersRepository.save(order);
  }
}

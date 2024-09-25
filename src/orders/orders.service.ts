import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menus } from 'src/menus/entities/menus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { OrderSummaryDto } from './dto/order-summary.dto';
import { OrderTableSummaryDto } from './dto/order-table-summary.dto';
import { OrdersGateway } from './orders.gateway';

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

    private ordersGateway: OrdersGateway,
  ) {}

  async findAllOrdersByRestaurantAndTable(restaurant_id: string, table_num: number): Promise<OrderTableSummaryDto[]> {
    const orders = await this.ordersRepository.find({
      where: {
        restaurant: { id: restaurant_id },
        restaurantTable: { table_num },
      },
      relations: ['menu', 'restaurantTable'],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for restaurant_id ${restaurant_id} and table number ${table_num}`);
    }

    // 필요한 정보만 추출하여 반환
    return orders.map((order) => ({
      id: order.id,
      table_num: order.restaurantTable.table_num,
      menu_name: order.menu.menu_name,
      price: order.menu.price,
      count: order.count,
      total_price: order.total_price,
    }));
  }

  async findAllOrdersByRestaurant(restaurant_id: string): Promise<OrderSummaryDto[]> {
    const orders = await this.ordersRepository.find({
      where: { restaurant: { id: restaurant_id } },
      relations: ['menu', 'restaurantTable'],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for restaurant with id ${restaurant_id}`);
    }

    // 필요한 정보만 추출하여 반환
    return orders.map((order) => ({
      id: order.id,
      table_num: order.restaurantTable.table_num,
      menu_name: order.menu.menu_name,
      price: order.menu.price,
      count: order.count,
    }));
  }

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

    // 주문을 DB에 저장
    const savedOrder = await this.ordersRepository.save(order);

    // 주문 업데이트 정보를 클라이언트로 전송 (실시간)
    this.ordersGateway.sendOrderUpdate({
      id: savedOrder.id,
      table_num: restaurantTable.table_num,
      menu_name: menu.menu_name,
      count,
      total_price,
    });

    return savedOrder;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menu } from 'src/menus/entities/menus.entity';
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

    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,

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

    return orders.map((order) => ({
      id: order.id,
      table_num: order.restaurantTable.table_num,
      menu_name: order.menu.menuName,
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

    return orders.map((order) => ({
      id: order.id,
      table_num: order.restaurantTable.table_num,
      menu_name: order.menu.menuName,
      price: order.menu.price,
      count: order.count,
    }));
  }

  async createOrder(createOrderDto: CreateOrderDto, restaurant_id: string, restaurantTable_id: string): Promise<Order> {
    const { menu_id, count } = createOrderDto;

    const menu = await this.menusRepository.findOne({ where: { id: menu_id } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurant_id } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const restaurantTable = await this.restaurantTableRepository.findOne({ where: { id: restaurantTable_id } });
    if (!restaurantTable) {
      throw new NotFoundException('Restaurant Table not found');
    }

    const total_price = menu.price * count;

    const order = this.ordersRepository.create({
      menu,
      count,
      total_price,
      ordered_at: new Date(),
      restaurant,
      restaurantTable,
    });

    const savedOrder = await this.ordersRepository.save(order);

    this.ordersGateway.sendOrderUpdate({
      id: savedOrder.id,
      table_num: restaurantTable.table_num,
      menu_name: menu.menuName,
      count,
      total_price,
    });

    return savedOrder;
  }
}

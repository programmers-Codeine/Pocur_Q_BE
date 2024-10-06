import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menu } from 'src/menus/entities/menus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { OrdersGateway } from './orders.gateway';
import { Option } from 'src/options/entities/options.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,

    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,

    @InjectRepository(Option)
    private optionsRepository: Repository<Option>,

    private ordersGateway: OrdersGateway,
  ) {}

  async getOrdersByTableNum(restaurantId: string, tableNum: number): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      where: {
        restaurant: { id: restaurantId },
        table_num: tableNum,
      },
      relations: ['restaurant', 'menu'],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for restaurant ID ${restaurantId} and table number ${tableNum}`);
    }

    return orders;
  }

  async getOrders(restaurantId: string): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      where: {
        restaurant: { id: restaurantId },
      },
      relations: ['restaurant', 'menu'],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for restaurant ID ${restaurantId}`);
    }

    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDto, restaurantId: string): Promise<Order> {
    const { menuId, count, tableNum, optionIds } = createOrderDto;

    const menu = await this.menusRepository.findOne({ where: { id: menuId } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const options = await this.optionsRepository.find({
      where: {
        id: In(optionIds),
      },
    });

    if (!options.length) {
      throw new NotFoundException('Options not found');
    }

    const totalPrice = menu.price * count + options.reduce((sum, option) => sum + option.optionPrice, 0);

    const order = this.ordersRepository.create({
      menu,
      count,
      total_price: totalPrice,
      ordered_at: new Date(),
      restaurant,
      table_num: tableNum,
      options,
    });

    const savedOrder = await this.ordersRepository.save(order);

    this.ordersGateway.sendOrderUpdate({
      id: savedOrder.id,
      table_num: savedOrder.table_num,
      menu_name: menu.menuName,
      count,
      total_price: totalPrice,
    });

    return savedOrder;
  }
}

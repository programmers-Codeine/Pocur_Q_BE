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
      throw new NotFoundException(
        `레스토랑 ID ${restaurantId} 및 테이블 번호 ${tableNum}에 대한 주문이 존재하지 않습니다.`,
      );
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
      throw new NotFoundException(`레스토랑 ID ${restaurantId}에 대한 주문이 존재하지 않습니다.`);
    }

    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDto, restaurantId: string): Promise<Order> {
    const { menuId, count, tableNum, optionIds } = createOrderDto;

    const menu = await this.menusRepository.findOne({ where: { id: menuId } });
    if (!menu) {
      throw new NotFoundException('해당 메뉴를 찾을 수 없습니다.');
    }

    const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException('해당 레스토랑을 찾을 수 없습니다.');
    }

    let options = [];
    if (optionIds && optionIds.length > 0) {
      options = await this.optionsRepository.find({
        where: {
          id: In(optionIds),
        },
      });

      if (options.length !== optionIds.length) {
        throw new NotFoundException('일부 옵션을 찾을 수 없습니다.');
      }
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

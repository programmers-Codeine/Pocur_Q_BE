import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menu } from 'src/menus/entities/menus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Gateway } from '../socket/socket.gateway';
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

    private gateway: Gateway,
  ) {}

  async getOrdersByTableNum(restaurantId: string, tableNum: number): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      where: {
        restaurant: { id: restaurantId },
        tableNum,
      },
      relations: ['restaurant', 'menu', 'menu.category', 'options'],
    });

    return orders.map((order) => ({
      ...order,
      categoryName: order.menu?.category?.categoryName,
    }));
  }

  async getOrders(restaurantId: string): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      where: {
        restaurant: { id: restaurantId },
      },
      relations: ['restaurant', 'menu', 'menu.category', 'options'],
    });

    return orders.map((order) => ({
      ...order,
      categoryName: order.menu?.category?.categoryName,
    }));
  }

  async createOrders(createOrderDtos: CreateOrderDto[], restaurantId: string): Promise<void> {
    for (const createOrderDto of createOrderDtos) {
      const { menuId, count, tableNum, optionIds } = createOrderDto;

      const menu = await this.menusRepository.findOne({ where: { id: menuId } });
      if (!menu) {
        throw new NotFoundException(`해당 메뉴를 찾을 수 없습니다.`);
      }

      const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurantId } });
      if (!restaurant) {
        throw new NotFoundException(`해당 레스토랑을 찾을 수 없습니다.`);
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
        totalPrice,
        orderedAt: new Date(),
        restaurant,
        tableNum,
        options,
      });

      const savedOrder = await this.ordersRepository.save(order);

      this.gateway.sendOrderUpdate(restaurantId, savedOrder);
    }
  }

  async deleteOrder(orderId: string, restaurantId: string): Promise<void> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId }, relations: ['restaurant'] });

    if (!order) {
      throw new NotFoundException(`ID가 ${orderId}인 주문을 찾을 수 없습니다.`);
    }

    if (order.restaurant.id !== restaurantId) {
      throw new ForbiddenException('해당 주문에 대한 권한이 없습니다.');
    }

    await this.ordersRepository.remove(order);
  }

  async deleteOrdersByTableNum(restaurantId: string, tableNum: number): Promise<void> {
    const orders = await this.ordersRepository.find({
      where: { restaurant: { id: restaurantId }, tableNum },
    });

    if (!orders.length) {
      throw new NotFoundException(
        `레스토랑 ID ${restaurantId} 및 테이블 번호 ${tableNum}에 대한 주문이 존재하지 않습니다.`,
      );
    }

    await this.ordersRepository.remove(orders);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Menus } from 'src/menus/entities/menus.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Menus)
    private menusRepository: Repository<Menus>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { menu_id, count } = createOrderDto;

    const menu = await this.menusRepository.findOne({ where: { id: menu_id } });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    // total_price는 메뉴의 가격 * 주문한 수량으로 계산
    const total_price = menu.price * count;

    const order = this.ordersRepository.create({
      menu,
      count,
      total_price,
      ordered_at: new Date(),
    });

    return this.ordersRepository.save(order);
  }
}

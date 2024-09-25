import { Controller, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Order } from './entities/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':restaurant_id/:restaurantTable_id')
  async createOrder(
    @Param('restaurant_id') restaurant_id: string,
    @Param('restaurantTable_id') restaurantTable_id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, restaurant_id, restaurantTable_id);
  }
}

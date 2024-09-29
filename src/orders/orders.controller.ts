import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Order } from './entities/orders.entity';
import { OrderSummaryDto } from './dto/order-summary.dto';
import { OrderTableSummaryDto } from './dto/order-table-summary.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':restaurant_id/table/:table_num')
  async findAllOrdersByRestaurantAndTable(
    @Param('restaurant_id') restaurant_id: string,
    @Param('table_num') table_num: number,
  ): Promise<OrderTableSummaryDto[]> {
    return this.ordersService.findAllOrdersByRestaurantAndTable(restaurant_id, table_num);
  }

  @Get(':restaurant_id')
  async findAllOrdersByRestaurant(@Param('restaurant_id') restaurant_id: string): Promise<OrderSummaryDto[]> {
    return this.ordersService.findAllOrdersByRestaurant(restaurant_id);
  }

  @Post(':restaurant_id/:restaurantTable_id')
  async createOrder(
    @Param('restaurant_id') restaurant_id: string,
    @Param('restaurantTable_id') restaurantTable_id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, restaurant_id, restaurantTable_id);
  }
}
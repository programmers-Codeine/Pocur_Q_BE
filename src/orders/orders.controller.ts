import { Controller, Post, Body, Param, Get, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Order } from './entities/orders.entity';
import { OrderSummaryDto } from './dto/order-summary.dto';
import { OrderTableSummaryDto } from './dto/order-table-summary.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('table/:table_num')
  async findAllOrdersByRestaurantAndTable(
    @Request() req,
    @Param('table_num') table_num: number,
  ): Promise<OrderTableSummaryDto[]> {
    const restaurant_id = req.user.restaurantId;

    return this.ordersService.findAllOrdersByRestaurantAndTable(restaurant_id, table_num);
  }

  @Get()
  async findAllOrdersByRestaurant(@Request() req): Promise<OrderSummaryDto[]> {
    const restaurant_id = req.user.restaurantId;

    return this.ordersService.findAllOrdersByRestaurant(restaurant_id);
  }

  @Post(':restaurantTable_id')
  async createOrder(
    @Request() req,
    @Param('restaurantTable_id') restaurantTable_id: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const restaurant_id = req.user.restaurantId;

    return this.ordersService.createOrder(createOrderDto, restaurant_id, restaurantTable_id);
  }
}

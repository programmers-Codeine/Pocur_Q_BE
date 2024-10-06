import { Controller, Post, Body, Param, Get, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Order } from './entities/orders.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('table/:table_num')
  async getOrdersByTableNum(@Request() req, @Param('table_num') tableNum: number): Promise<Order[]> {
    const restaurantId = req.user.restaurantId;

    return this.ordersService.getOrdersByTableNum(restaurantId, tableNum);
  }

  @Get()
  async getOrders(@Request() req): Promise<Order[]> {
    const restaurantId = req.user.restaurantId;

    return this.ordersService.getOrders(restaurantId);
  }

  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const restaurantId = req.user.restaurantId;

    return this.ordersService.createOrder(createOrderDto, restaurantId);
  }
}

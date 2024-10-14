import { Controller, Post, Body, Param, Get, Request, UseGuards, Delete, UnauthorizedException } from '@nestjs/common';
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
  async createOrders(@Request() req, @Body() createOrderDtos: CreateOrderDto[]): Promise<Order[]> {
    const restaurantId = req.user.restaurantId;

    return this.ordersService.createOrders(createOrderDtos, restaurantId);
  }

  @Delete(':order_id')
  async deleteOrder(@Request() req, @Param('order_id') orderId: string): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.ordersService.deleteOrder(orderId, restaurantId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete('table/:table_num')
  async deleteOrdersByTableNum(@Request() req, @Param('table_num') tableNum: number): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.ordersService.deleteOrdersByTableNum(restaurantId, tableNum);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

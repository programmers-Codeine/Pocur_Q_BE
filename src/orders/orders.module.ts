import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import OrdersGateway from './orders.gateway';
import { Option } from 'src/options/entities/options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, Menu, Option])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
  exports: [OrdersService],
})
export class OrdersModule {}

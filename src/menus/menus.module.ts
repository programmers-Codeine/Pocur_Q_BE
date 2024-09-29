import { Module } from '@nestjs/common';
import { Menu } from './entities/menus.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/orders.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Order, Restaurant])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}

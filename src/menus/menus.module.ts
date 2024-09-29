import { Module } from '@nestjs/common';
import { Menu } from './entities/menus.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Order])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}

import { Module } from '@nestjs/common';
import { Menus } from './entities/menus.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Menus])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}

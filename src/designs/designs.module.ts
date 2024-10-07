import { Module } from '@nestjs/common';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from './entities/designs.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Design, Restaurant])],
  controllers: [DesignsController],
  providers: [DesignsService],
  exports: [DesignsService, TypeOrmModule],
})
export class DesignsModule {}

import { Module } from '@nestjs/common';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from './entities/designs.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { DesignPreset } from 'src/designPresets/entities/designPresets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Design, Restaurant, DesignPreset])],
  controllers: [DesignsController],
  providers: [DesignsService],
  exports: [DesignsService, TypeOrmModule],
})
export class DesignsModule {}

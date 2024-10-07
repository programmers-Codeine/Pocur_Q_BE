import { Module } from '@nestjs/common';
import { DesignPresetsController } from './designPresets.controller';
import { DesignPresetsService } from './designPresets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignPreset } from './entities/designPresets.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DesignPreset, Restaurant])],
  controllers: [DesignPresetsController],
  providers: [DesignPresetsService],
  exports: [DesignPresetsService],
})
export class DesignPresetsModule {}

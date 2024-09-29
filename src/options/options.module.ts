import { Module } from '@nestjs/common';
import { Option } from './entities/options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { Menu } from 'src/menus/entities/menus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Menu])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}

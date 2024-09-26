import { Module } from '@nestjs/common';
import { Option } from './entities/options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
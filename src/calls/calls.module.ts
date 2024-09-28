import { Module } from '@nestjs/common';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { Call } from './entities/calls.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  controllers: [CallsController],
  providers: [CallsService],
  exports: [CallsService],
})
export class CallsModule {}

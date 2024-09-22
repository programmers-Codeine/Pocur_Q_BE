import { Module } from '@nestjs/common';
import { RestaurantTablesController } from './restaurantTables.controller';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTable])],
  controllers: [RestaurantTablesController],
  providers: [RestaurantTablesService],
  exports: [RestaurantTablesService],
})
export class RestaurantTablesModule {}

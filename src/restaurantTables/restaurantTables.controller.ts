import { Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';

@Controller('restaurantTables')
export class RestaurantTablesController {
  constructor(private readonly restaurantTablesService: RestaurantTablesService) {}

  @Get(':restaurant_id')
  async getTablesByRestaurant(@Param('restaurant_id') restaurantId: string): Promise<RestaurantTable[]> {
    return this.restaurantTablesService.findTablesByRestaurantId(restaurantId);
  }

  @Post('add/:restaurant_id')
  async addTable(@Param('restaurant_id') restaurantId: string): Promise<RestaurantTable> {
    return this.restaurantTablesService.addTableWithNextTableNum(restaurantId);
  }

  @Delete('remove/:restaurant_id')
  async removeMaxTable(@Param('restaurant_id') restaurantId: string): Promise<void> {
    return this.restaurantTablesService.removeTableWithMaxTableNum(restaurantId);
  }
}

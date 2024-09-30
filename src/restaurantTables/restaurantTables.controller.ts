import { Controller, Post, Delete, Get, Request } from '@nestjs/common';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';

@Controller('restaurantTables')
export class RestaurantTablesController {
  constructor(private readonly restaurantTablesService: RestaurantTablesService) {}

  @Get()
  async getTablesByRestaurant(@Request() req): Promise<RestaurantTable[]> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.findTablesByRestaurantId(restaurantId);
  }

  @Post('add')
  async addTable(@Request() req): Promise<RestaurantTable> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.addTableWithNextTableNum(restaurantId);
  }

  @Delete('remove')
  async removeMaxTable(@Request() req): Promise<void> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.removeTableWithMaxTableNum(restaurantId);
  }
}

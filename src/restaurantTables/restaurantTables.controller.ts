import { Controller, Post, Delete, Get, Request, UseGuards, Param } from '@nestjs/common';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('restaurantTables')
export class RestaurantTablesController {
  constructor(private readonly restaurantTablesService: RestaurantTablesService) {}

  @Get()
  async getTables(@Request() req): Promise<RestaurantTable[]> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.getTables(restaurantId);
  }

  @Post()
  async addTable(@Request() req): Promise<RestaurantTable> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.addTable(restaurantId);
  }

  @Delete(':table_num')
  async deleteTable(@Request() req, @Param('table_num') tableNum: number): Promise<void> {
    const restaurantId = req.user.restaurantId;

    return this.restaurantTablesService.deleteTable(restaurantId, tableNum);
  }
}

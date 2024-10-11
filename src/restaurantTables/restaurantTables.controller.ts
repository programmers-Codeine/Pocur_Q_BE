import { Controller, Post, Delete, Get, Request, UseGuards, Param, UnauthorizedException } from '@nestjs/common';
import { RestaurantTablesService } from './restaurantTables.service';
import { RestaurantTable } from './entities/restaurantTables.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('restaurantTables')
export class RestaurantTablesController {
  constructor(private readonly restaurantTablesService: RestaurantTablesService) {}

  @Get()
  async getTables(@Request() req): Promise<RestaurantTable[]> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.restaurantTablesService.getTables(restaurantId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Post()
  async addTable(@Request() req): Promise<RestaurantTable> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.restaurantTablesService.addTable(restaurantId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete(':table_num')
  async deleteTable(@Request() req, @Param('table_num') tableNum: number): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.restaurantTablesService.deleteTable(restaurantId, tableNum);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menus } from './entities/menus.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id')
  async getAllMenus(@Param('restaurant_id') restaurantId: string): Promise<Menus[]> {
    return await this.menusService.getAllMenus(restaurantId);
  }
}

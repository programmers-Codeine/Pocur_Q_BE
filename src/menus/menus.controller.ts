import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menus } from './entities/menus.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuDto } from './dtos/create-menus.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id')
  async getAllMenus(@Param('restaurant_id') restaurantId: string): Promise<Menus[]> {
    return await this.menusService.getAllMenus(restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id/:menu_id')
  async getMenu(@Param('restaurant_id') restaurantId: string, @Param('menu_id') menuId: string): Promise<Menus> {
    return await this.menusService.getMenu(restaurantId, menuId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id')
  async createMenu(@Param('restaurant_id') restaurantId: string, @Body() createMenuDto: CreateMenuDto): Promise<Menus> {
    return await this.menusService.createMenu(restaurantId, createMenuDto);
  }
}

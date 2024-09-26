import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menus } from './entities/menus.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuRequestDto } from './dtos/create-menus.dto';
import { UpdateMenuRequestDto } from './dtos/update-menus.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id')
  async getAllMenus(
    @Param('restaurant_id') restaurantId: string,
    @Query('category_id') categoryId?: string,
  ): Promise<Menus[]> {
    return await this.menusService.getAllMenus(restaurantId, categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id/:menu_id')
  async getMenu(@Param('restaurant_id') restaurantId: string, @Param('menu_id') menuId: string): Promise<Menus> {
    return await this.menusService.getMenu(restaurantId, menuId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id')
  async createMenu(
    @Param('restaurant_id') restaurantId: string,
    @Body() createMenuRequestDto: CreateMenuRequestDto,
  ): Promise<Menus> {
    return await this.menusService.createMenu(restaurantId, createMenuRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':restaurant_id/:menu_id')
  async updateMenu(
    @Param('restaurant_id') restaurantId: string,
    @Param('menu_id') menuId: string,
    @Body() updateMenuRequestDto: UpdateMenuRequestDto,
  ): Promise<Menus> {
    return await this.menusService.updateMenu(restaurantId, menuId, updateMenuRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':restaurant_id/:menu_id')
  async deleteCategory(@Param('restaurant_id') restaurantId: string, @Param('menu_id') menuId: string): Promise<void> {
    return await this.menusService.deleteMenu(restaurantId, menuId);
  }
}

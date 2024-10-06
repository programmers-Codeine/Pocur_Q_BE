import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menu } from './entities/menus.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuRequestDto } from './dtos/create-menus.dto';
import { UpdateMenuRequestDto } from './dtos/update-menus.dto';
import { GetAllMenusResponseDto } from './dtos/get-all-menus-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus(@Request() req, @Query('category_id') categoryId?: string): Promise<GetAllMenusResponseDto[]> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.getAllMenus(restaurantId, categoryId);
  }

  @Get(':menu_id')
  async getMenu(@Request() req, @Param('menu_id') menuId: string): Promise<GetAllMenusResponseDto> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.getMenu(restaurantId, menuId);
  }

  @Post()
  async createMenu(@Request() req, @Body() createMenuRequestDto: CreateMenuRequestDto): Promise<Menu> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.createMenu(restaurantId, createMenuRequestDto);
  }

  @Put(':menu_id')
  async updateMenu(
    @Request() req,
    @Param('menu_id') menuId: string,
    @Body() updateMenuRequestDto: UpdateMenuRequestDto,
  ): Promise<Menu> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.updateMenu(restaurantId, menuId, updateMenuRequestDto);
  }

  @Delete(':menu_id')
  async deleteCategory(@Request() req, @Param('menu_id') menuId: string): Promise<void> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.deleteMenu(restaurantId, menuId);
  }
}

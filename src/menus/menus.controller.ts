import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { Menu } from './entities/menus.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuRequestDto } from './dtos/create-menus.dto';
import { UpdateMenuRequestDto } from './dtos/update-menus.dto';
import { GetAllMenusResponseDto } from './dtos/get-all-menus-response.dto';
import { GetMenuResponseDto } from './dtos/get-menu-response.dto';

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
  async getMenu(@Request() req, @Param('menu_id') menuId: string): Promise<GetMenuResponseDto> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.getMenu(restaurantId, menuId);
  }

  @Post()
  async createMenu(@Request() req, @Body() createMenuRequestDto: CreateMenuRequestDto): Promise<Menu> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      return await this.menusService.createMenu(restaurantId, createMenuRequestDto);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Put(':menu_id')
  async updateMenu(
    @Request() req,
    @Param('menu_id') menuId: string,
    @Body() updateMenuRequestDto: UpdateMenuRequestDto,
  ): Promise<Menu> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      return await this.menusService.updateMenu(restaurantId, menuId, updateMenuRequestDto);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete(':menu_id')
  async deleteCategory(@Request() req, @Param('menu_id') menuId: string): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return await this.menusService.deleteMenu(restaurantId, menuId);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

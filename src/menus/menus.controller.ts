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
  async getAllMenus(@Request() req, @Query('categoryId') categoryId?: string): Promise<GetAllMenusResponseDto[]> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.getAllMenus(restaurantId, categoryId);
  }

  @Get(':menuId')
  async getMenu(@Request() req, @Param('menuId') menuId: string): Promise<GetMenuResponseDto> {
    const restaurantId = req.user.restaurantId;

    return await this.menusService.getMenu(restaurantId, menuId);
  }

  @Post()
  async createMenu(@Request() req, @Body() createMenuRequestDto: CreateMenuRequestDto): Promise<{ menuId: string }> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      const menuId = await this.menusService.createMenu(restaurantId, createMenuRequestDto);
      return { menuId };
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Put(':menuId')
  async updateMenu(
    @Request() req,
    @Param('menuId') menuId: string,
    @Body() updateMenuRequestDto: UpdateMenuRequestDto,
  ): Promise<Menu> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      return await this.menusService.updateMenu(restaurantId, menuId, updateMenuRequestDto);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete(':menuId')
  async deleteCategory(@Request() req, @Param('menuId') menuId: string): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return await this.menusService.deleteMenu(restaurantId, menuId);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

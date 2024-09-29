import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menu } from './entities/menus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuRequestDto } from './dtos/create-menus.dto';
import { UpdateMenuRequestDto } from './dtos/update-menus.dto';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Menu>,
  ) {}

  //Todo: 유저가 매개변수로 받은 restaurantId의 주인이 맞는지 확인하는 로직 필요
  async getAllMenus(restaurantId: string, categoryId?: string): Promise<Menu[]> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`${restaurantId}에 해당하는 식당을 찾지 못했습니다.`);
    }

    const menus = await this.menuRepository.find({
      where: {
        restaurant: { id: restaurantId },
        ...(categoryId && { category: { id: categoryId } }),
      },
      relations: ['options'],
    });

    if (menus.length === 0) {
      throw new NotFoundException('해당 조건에 맞는 메뉴가 없습니다.');
    }

    return menus;
  }

  async getMenu(restaurantId: string, menuId: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: {
        id: menuId,
        restaurant: { id: restaurantId },
      },
      relations: ['options'],
    });

    if (!menu) {
      throw new NotFoundException('메뉴를 찾을 수 없습니다.');
    }

    return menu;
  }

  async createMenu(restaurantId: string, createMenuRequestDto: CreateMenuRequestDto): Promise<Menu> {
    const newMenu = this.menuRepository.create({
      ...createMenuRequestDto,
      restaurant: { id: restaurantId },
      category: createMenuRequestDto.categoryId ? { id: createMenuRequestDto.categoryId } : null,
    });

    return await this.menuRepository.save(newMenu);
  }

  async updateMenu(restaurantId: string, menuId: string, updateMenuRequestDto: UpdateMenuRequestDto): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId, restaurant: { id: restaurantId } } });

    if (!menu) {
      throw new NotFoundException(`${menuId}에 해당하는 메뉴가 없습니다.`);
    }

    Object.assign(menu, {
      ...updateMenuRequestDto,
      category: updateMenuRequestDto.categoryId ? { id: updateMenuRequestDto.categoryId } : null,
    });

    return await this.menuRepository.save(menu);
  }

  async deleteMenu(restaurantId: string, menuId: string): Promise<void> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId, restaurant: { id: restaurantId } } });
    if (!menu) {
      throw new NotFoundException(`레스토랑 ID ${restaurantId}에 해당하는 메뉴 ID ${menuId}를 찾을 수 없습니다.`);
    }

    await this.menuRepository.remove(menu);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menu } from './entities/menus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuRequestDto } from './dtos/create-menus.dto';
import { UpdateMenuRequestDto } from './dtos/update-menus.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  //Todo: 유저가 매개변수로 받은 restaurantId의 주인이 맞는지 확인하는 로직 필요
  async getAllMenus(restaurantId: string, categoryId?: string): Promise<Menu[]> {
    const menuFilter = {
      restaurant_id: restaurantId,
      ...(categoryId && { category_id: categoryId }),
    };

    const menus = await this.menuRepository.find({ where: menuFilter, relations: ['options'] });

    if (menus.length === 0) {
      throw new NotFoundException('해당 조건에 맞는 메뉴가 없습니다.');
    }

    return menus;
  }

  async getMenu(restaurantId: string, menuId: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        id: menuId,
      },
      relations: ['options'],
    });

    if (!menu) {
      throw new NotFoundException('메뉴를 찾을 수 없습니다.');
    }

    return menu;
  }

  async createMenu(restaurantId: string, createMenuRequestDto: CreateMenuRequestDto): Promise<Menu> {
    const newMenu = new Menu();

    newMenu.restaurant_id = restaurantId;
    newMenu.category_id = createMenuRequestDto.categoryId;
    newMenu.menu_name = createMenuRequestDto.menuName;
    newMenu.price = createMenuRequestDto.price;
    newMenu.menu_detail = createMenuRequestDto.menuDetail;
    newMenu.menu_img = createMenuRequestDto.menuImg;
    newMenu.origin = createMenuRequestDto.origin;
    newMenu.is_active = createMenuRequestDto.isActivate;
    newMenu.sold_out = createMenuRequestDto.soldOut;

    return await this.menuRepository.save(newMenu);
  }

  async updateMenu(restaurantId: string, menuId: string, updateMenuRequestDto: UpdateMenuRequestDto): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId, restaurant_id: restaurantId } });

    if (!menu) {
      throw new NotFoundException(`${menuId}에 해당하는 메뉴가 없습니다.`);
    }

    menu.id = menuId;
    menu.restaurant_id = restaurantId;
    menu.category_id = updateMenuRequestDto.categoryId;
    menu.menu_name = updateMenuRequestDto.menuName;
    menu.price = updateMenuRequestDto.price;
    menu.menu_detail = updateMenuRequestDto.menuDetail;
    menu.menu_img = updateMenuRequestDto.menuImg;
    menu.origin = updateMenuRequestDto.origin;
    menu.is_active = updateMenuRequestDto.isActivate;
    menu.sold_out = updateMenuRequestDto.soldOut;

    return await this.menuRepository.save(menu);
  }

  async deleteMenu(restaurantId: string, menuId: string): Promise<void> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId, restaurant_id: restaurantId } });
    if (!menu) {
      throw new NotFoundException(`레스토랑 ID ${restaurantId}에 해당하는 카테고리 ID ${menuId}를 찾을 수 없습니다.`);
    }

    await this.menuRepository.remove(menu);
  }
}

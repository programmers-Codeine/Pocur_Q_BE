import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menus } from './entities/menus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dtos/create-menus.dto';
import { UpdateMenuDto } from './dtos/update-menus.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus)
    private readonly menuRepository: Repository<Menus>,
  ) {}

  //Todo: 유저가 매개변수로 받은 restaurantId의 주인이 맞는지 확인하는 로직 필요
  async getAllMenus(restaurantId: string): Promise<Menus[]> {
    const menus = await this.menuRepository.find({ where: { restaurant_id: restaurantId }, relations: ['options'] });
    if (menus.length === 0) {
      throw new NotFoundException('레스토랑의 메뉴가 없습니다.');
    }

    return menus;
  }

  async getMenu(restaurantId: string, menuId: string): Promise<Menus> {
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

  async createMenu(restaurantId: string, createMenuDto: CreateMenuDto): Promise<Menus> {
    const newMenu = new Menus();

    newMenu.restaurant_id = restaurantId;
    newMenu.category_id = createMenuDto.categoryId;
    newMenu.menu_name = createMenuDto.menuName;
    newMenu.price = createMenuDto.price;
    newMenu.menu_detail = createMenuDto.menuDetail;
    newMenu.menu_img = createMenuDto.menuImg;
    newMenu.origin = createMenuDto.origin;
    newMenu.is_active = createMenuDto.isActivate;
    newMenu.sold_out = createMenuDto.soldOut;

    return await this.menuRepository.save(newMenu);
  }

  async updateMenu(restaurantId: string, menuId: string, updateMenuDto: UpdateMenuDto): Promise<Menus> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId, restaurant_id: restaurantId } });

    if (!menu) {
      throw new NotFoundException(`${menuId}에 해당하는 메뉴가 없습니다.`);
    }
    const newMenu = { ...menu, ...updateMenuDto };
    return await this.menuRepository.save(newMenu);
  }
}

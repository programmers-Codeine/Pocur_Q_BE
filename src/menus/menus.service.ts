import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menus } from './entities/menus.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus)
    private readonly menuRepository: Repository<Menus>,
  ) {}

  //Todo: 유저가 매개변수로 받은 restaurantId의 주인이 맞는지 확인하는 로직 필요
  async getAllMenus(restaurantId: string): Promise<Menus[]> {
    const menus = await this.menuRepository.find({ where: { restaurant_id: restaurantId } });
    if (menus.length === 0) {
      throw new NotFoundException('레스토랑의 메뉴가 없습니다.');
    }

    return menus;
  }
}

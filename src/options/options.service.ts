import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/options.entity';
import { CreateOptionRequestDto } from './dtos/create-options.dro';
import { Menu } from 'src/menus/entities/menus.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createOptions(menuId: string, createOptionsRequestDto: CreateOptionRequestDto[]): Promise<Option[]> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new NotFoundException(`${menuId}에 해당하는 메뉴를 찾지 못했습니다.`);
    }

    await this.optionRepository.delete({ menu: { id: menuId } });

    const newOptions = createOptionsRequestDto.map((optionData) => {
      return this.optionRepository.create({
        menu,
        optionName: optionData.optionName,
        optionPrice: optionData.optionPrice,
      });
    });

    return await this.optionRepository.save(newOptions);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/options.entity';
import { CreateOptionRequestDto } from './dtos/create-options.dro';
import { Menu } from 'src/menus/entities/menus.entity';
import { UpdateOptionRequestDto } from './dtos/update-options.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createOption(menuId: string, createOptionRequestDto: CreateOptionRequestDto): Promise<Option> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new NotFoundException(`${menuId}에 해당하는 메뉴를 찾지 못했습니다.`);
    }

    const newOption = this.optionRepository.create({
      menu,
      optionName: createOptionRequestDto.optionName,
      optionPrice: createOptionRequestDto.optionPrice,
    });

    return await this.optionRepository.save(newOption);
  }

  async updateOption(
    menuId: string,
    optionId: string,
    updateOptionRequestDto: UpdateOptionRequestDto,
  ): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['menu'],
    });

    if (!option || option.menu.id !== menuId) {
      throw new NotFoundException(`${menuId}에 해당하는 옵션 ${optionId}을 찾지 못했습니다. `);
    }

    option.optionName = updateOptionRequestDto.optionName;
    option.optionPrice = updateOptionRequestDto.optionPrice;

    return await this.optionRepository.save(option);
  }

  async deleteOption(menuId: string, optionId: string): Promise<void> {
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['menu'],
    });

    if (!option || option.menu.id !== menuId) {
      throw new NotFoundException(`${menuId}에 해당하는 옵션 ${optionId}을 찾지 못했습니다. `);
    }

    await this.optionRepository.remove(option);
  }
}

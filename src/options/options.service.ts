import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/options.entity';
import { CreateOptionRequestDto } from './dtos/create-options.dro';
import { UpdateOptionRequestDto } from './dtos/update-options.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async createOption(menuId: string, createOptionRequestDto: CreateOptionRequestDto): Promise<Option> {
    const newOption = new Option();

    newOption.menu_id = menuId;
    newOption.option_name = createOptionRequestDto.optionName;
    newOption.option_price = createOptionRequestDto.optionPrice;

    return await this.optionRepository.save(newOption);
  }

  async updateOption(
    menuId: string,
    optionId: string,
    updateOptionRequestDto: UpdateOptionRequestDto,
  ): Promise<Option> {
    const option = await this.optionRepository.findOne({ where: { id: optionId, menu_id: menuId } });

    if (!option) {
      throw new NotFoundException(`${optionId}에 해당하는 옵션이 없습니다.`);
    }

    option.option_name = updateOptionRequestDto.optionName;
    option.option_price = updateOptionRequestDto.optionPrice;

    return await this.optionRepository.save(option);
  }

  async deleteOption(menuId: string, optionId: string): Promise<void> {
    const option = await this.optionRepository.findOne({ where: { id: optionId, menu_id: menuId } });
    if (!option) {
      throw new NotFoundException(`메뉴 ID ${menuId}에 해당하는 옵션 ID ${optionId}를 찾을 수 없습니다.`);
    }

    await this.optionRepository.remove(option);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/options.entity';
import { CreateOptionDto } from './dtos/create-options.dro';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async createOption(restaurantId: string, menuId: string, createOptionDto: CreateOptionDto): Promise<Option> {
    const newOption = new Option();

    newOption.menu_id = menuId;
    newOption.option_name = createOptionDto.optionName;
    newOption.option_price = createOptionDto.optionPrice;

    return await this.optionRepository.save(newOption);
  }

  async updateOption(
    restaurantId: string,
    menuId: string,
    optionId: string,
    createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    const option = await this.optionRepository.findOne({ where: { id: optionId, menu_id: menuId } });

    if (!option) {
      throw new NotFoundException(`이 ${optionId}에 해당하는 옵션가 없습니다.`);
    }

    option.option_name = createOptionDto.optionName;
    option.option_price = createOptionDto.optionPrice;

    return await this.optionRepository.save(option);
  }
}

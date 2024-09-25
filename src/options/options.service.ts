import { Injectable } from '@nestjs/common';
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
}

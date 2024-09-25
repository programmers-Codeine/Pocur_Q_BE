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
    const newOption = await this.optionRepository.create({ ...createOptionDto, menu_id: menuId });

    return await this.optionRepository.save(newOption);
  }
}

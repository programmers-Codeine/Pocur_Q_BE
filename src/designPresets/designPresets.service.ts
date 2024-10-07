import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesignPreset } from './entities/designPresets.entity';
import { CreateDesignPresetDto } from './dto/create-designPresets.dto';
import { UpdateDesignPresetDto } from './dto/update-designPresets.dto';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Injectable()
export class DesignPresetsService {
  constructor(
    @InjectRepository(DesignPreset)
    private readonly designPresetsRepository: Repository<DesignPreset>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async getDesignPresets(restaurantId: string): Promise<DesignPreset[]> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    return this.designPresetsRepository.find({ where: { restaurant } });
  }

  async getDesignPresetById(designPresetId: string): Promise<DesignPreset> {
    const designPreset = await this.designPresetsRepository.findOne({ where: { id: designPresetId } });

    if (!designPreset) {
      throw new NotFoundException(`ID가 ${designPresetId}인 디자인 프리셋을 찾을 수 없습니다.`);
    }

    return designPreset;
  }

  async createDesignPreset(restaurantId: string, createDesignPresetDto: CreateDesignPresetDto): Promise<DesignPreset> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑을 찾을 수 없습니다.`);
    }

    const newDesignPreset = this.designPresetsRepository.create({
      ...createDesignPresetDto,
      restaurant,
    });

    return this.designPresetsRepository.save(newDesignPreset);
  }

  async updateDesignPreset(
    designPresetId: string,
    updateDesignPresetDto: UpdateDesignPresetDto,
  ): Promise<DesignPreset> {
    const designPreset = await this.designPresetsRepository.findOne({ where: { id: designPresetId } });

    if (!designPreset) {
      throw new NotFoundException(`ID가 ${designPresetId}인 디자인 프리셋을 찾을 수 없습니다.`);
    }
    const updatedDesignPreset = this.designPresetsRepository.merge(designPreset, updateDesignPresetDto);

    return this.designPresetsRepository.save(updatedDesignPreset);
  }

  async deleteDesignPreset(designPresetId: string): Promise<void> {
    const result = await this.designPresetsRepository.delete(designPresetId);

    if (result.affected === 0) {
      throw new NotFoundException(`ID가 ${designPresetId}인 디자인 프리셋을 찾을 수 없습니다.`);
    }
  }
}

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Design } from './entities/designs.entity';
import { DesignPreset } from 'src/designPresets/entities/designPresets.entity';
import { UpdateDesignDto } from './dto/update-designs.dto';

@Injectable()
export class DesignsService {
  constructor(
    @InjectRepository(Design)
    private readonly designsRepository: Repository<Design>,

    @InjectRepository(DesignPreset)
    private readonly designPresetRepository: Repository<DesignPreset>,
  ) {}

  async getDesign(restaurantId: string): Promise<Design> {
    const design = await this.designsRepository.findOne({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant', 'designPreset'],
    });

    if (!design) {
      throw new NotFoundException(`ID가 ${restaurantId}인 레스토랑에 대한 현재 적용된 디자인을 찾을 수 없습니다.`);
    }

    return design;
  }

  async updateDesign(designId: string, restaurantId: string, updateDesignDto: UpdateDesignDto): Promise<Design> {
    const design = await this.designsRepository.findOne({
      where: { id: designId },
      relations: ['restaurant'],
    });

    if (!design) {
      throw new NotFoundException(`ID가 ${designId}인 디자인을 찾을 수 없습니다.`);
    }

    if (design.restaurant.id !== restaurantId) {
      throw new ForbiddenException(`이 레스토랑에 대한 권한이 없습니다.`);
    }

    if (updateDesignDto.designPresetId) {
      const designPreset = await this.designPresetRepository.findOne({ where: { id: updateDesignDto.designPresetId } });
      if (!designPreset) {
        throw new NotFoundException(`ID가 ${updateDesignDto.designPresetId}인 디자인 프리셋을 찾을 수 없습니다.`);
      }
      design.designPreset = designPreset;
    }

    const updatedDesign = {
      ...design,
      ...updateDesignDto,
    } as DeepPartial<Design>;

    return this.designsRepository.save(updatedDesign);
  }
}

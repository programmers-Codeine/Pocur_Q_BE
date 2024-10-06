import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Design } from './entities/designs.entity';
import { UpdateDesignDto } from './dto/update-designs.dto';

@Injectable()
export class DesignsService {
  constructor(
    @InjectRepository(Design)
    private readonly designsRepository: Repository<Design>,
  ) {}

  async getDesign(restaurantId: string): Promise<Design> {
    const design = await this.designsRepository.findOne({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });

    if (!design) {
      throw new NotFoundException(`레스토랑 ID가 ${restaurantId}인 디자인을 찾을 수 없습니다.`);
    }

    return design;
  }

  async updateDesign(restaurantId: string, updateDesignDto: UpdateDesignDto): Promise<Design> {
    const design = await this.getDesign(restaurantId);
    if (!design) {
      throw new NotFoundException(`레스토랑 ID가 ${restaurantId}인 디자인을 찾을 수 없습니다.`);
    }

    const updatedDesign = this.designsRepository.merge(design, updateDesignDto);

    return await this.designsRepository.save(updatedDesign);
  }
}

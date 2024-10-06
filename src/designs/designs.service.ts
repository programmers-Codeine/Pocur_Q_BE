import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Design } from './entities/designs.entity';

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
}

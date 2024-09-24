import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/create-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async getCategory(restaurantId: string): Promise<Categories[]> {
    const categories = await this.categoryRepository.find({ where: { restaurant_id: restaurantId } });
    if (!categories) {
      throw new NotFoundException('레스토랑의 카테고리를 찾지 못했습니다.');
    }

    return categories;
  }

  async createCategory(restaurantId: string, createCategoryDto: CreateCategoryDto): Promise<Categories> {
    const newCategory = await this.categoryRepository.create({ ...createCategoryDto, restaurant_id: restaurantId });

    return await this.categoryRepository.save(newCategory);
  }
}

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

  async updateCategory(
    restaurantId: string,
    categoryId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId, restaurant_id: restaurantId } });

    if (!category) {
      throw new NotFoundException(`이 ${categoryId}에 해당하는 카테고리가 없습니다.`);
    }
    const newCategory = { ...category, ...createCategoryDto };
    return await this.categoryRepository.save(newCategory);
  }

  async deleteCategory(restaurantId: string, categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId, restaurant_id: restaurantId } });

    if (!category) {
      throw new NotFoundException(
        `레스토랑 ID ${restaurantId}에 해당하는 카테고리 ID ${categoryId}를 찾을 수 없습니다.`,
      );
    }

    await this.categoryRepository.remove(category); // 카테고리 삭제
  }
}

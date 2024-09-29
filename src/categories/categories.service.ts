import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequestDto } from './dtos/create-categories.dto';
import { UpdateCategoryRequestDto } from './dtos/update-categories.dto';

//Todo: 추후 user와 restaurant 매칭 맞는지 확인하는 로직 추가 필요
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategory(restaurantId: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({ where: { restaurant: { id: restaurantId } } });

    if (!categories.length) {
      throw new NotFoundException('레스토랑의 카테고리를 찾지 못했습니다.');
    }

    return categories;
  }

  async createCategory(restaurantId: string, createCategoryRequestDto: CreateCategoryRequestDto): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      ...createCategoryRequestDto,
      restaurant: { id: restaurantId },
    });

    return await this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    restaurantId: string,
    categoryId: string,
    updateCategoryRequestDto: UpdateCategoryRequestDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, restaurant: { id: restaurantId } },
    });

    if (!category) {
      throw new NotFoundException(`이 ${categoryId}에 해당하는 카테고리가 없습니다.`);
    }

    Object.assign(category, updateCategoryRequestDto);

    return await this.categoryRepository.save(category);
  }

  async deleteCategory(restaurantId: string, categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, restaurant: { id: restaurantId } },
    });

    if (!category) {
      throw new NotFoundException(
        `레스토랑 ID ${restaurantId}에 해당하는 카테고리 ID ${categoryId}를 찾을 수 없습니다.`,
      );
    }

    await this.categoryRepository.remove(category);
  }
}

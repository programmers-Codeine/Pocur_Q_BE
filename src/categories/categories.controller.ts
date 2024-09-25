import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';
import { CreateCategoryDto } from './dtos/create-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':restaurant_id')
  async getCategory(@Param('restaurant_id') restaurantId: string): Promise<Categories[]> {
    return await this.categoriesService.getCategory(restaurantId);
  }

  @Post(':restaurant_id')
  async createCategory(
    @Param('restaurant_id') restaurantId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    return await this.categoriesService.createCategory(restaurantId, createCategoryDto);
  }

  @Put(':restaurant_id/:category_id')
  async updateCategory(
    @Param('restaurant_id') restaurantId: string,
    @Param('category_id') categoryId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    return await this.categoriesService.updateCategory(restaurantId, categoryId, createCategoryDto);
  }

  @Delete(':restaurant_id/:category_id')
  async deleteCategory(
    @Param('restaurant_id') restaurantId: string,
    @Param('category_id') categoryId: string,
  ): Promise<void> {
    return await this.categoriesService.deleteCategory(restaurantId, categoryId);
  }
}

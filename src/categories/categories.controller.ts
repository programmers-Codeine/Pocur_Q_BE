import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';
import { CreateCategoryRequestDto } from './dtos/create-categories.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCategoryRequestDto } from './dtos/update-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id')
  async getCategory(@Param('restaurant_id') restaurantId: string): Promise<Category[]> {
    return await this.categoriesService.getCategory(restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id')
  async createCategory(
    @Param('restaurant_id') restaurantId: string,
    @Body() createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(restaurantId, createCategoryRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':restaurant_id/:category_id')
  async updateCategory(
    @Param('restaurant_id') restaurantId: string,
    @Param('category_id') categoryId: string,
    @Body() updateCategoryRequestDto: UpdateCategoryRequestDto,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(restaurantId, categoryId, updateCategoryRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':restaurant_id/:category_id')
  async deleteCategory(
    @Param('restaurant_id') restaurantId: string,
    @Param('category_id') categoryId: string,
  ): Promise<void> {
    return await this.categoriesService.deleteCategory(restaurantId, categoryId);
  }
}

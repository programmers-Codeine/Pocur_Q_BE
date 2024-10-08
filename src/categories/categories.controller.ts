import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';
import { CreateCategoryRequestDto } from './dtos/create-categories.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCategoryRequestDto } from './dtos/update-categories.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategory(@Request() req): Promise<Category[]> {
    const restaurantId = req.user.restaurantId;

    return await this.categoriesService.getCategory(restaurantId);
  }

  @Post()
  async createCategory(@Request() req, @Body() createCategoryRequestDto: CreateCategoryRequestDto): Promise<Category> {
    const restaurantId = req.user.restaurantId;

    return await this.categoriesService.createCategory(restaurantId, createCategoryRequestDto);
  }

  @Put(':category_id')
  async updateCategory(
    @Request() req,
    @Param('category_id') categoryId: string,
    @Body() updateCategoryRequestDto: UpdateCategoryRequestDto,
  ): Promise<Category> {
    const restaurantId = req.user.restaurantId;

    return await this.categoriesService.updateCategory(restaurantId, categoryId, updateCategoryRequestDto);
  }

  @Delete(':category_id')
  async deleteCategory(@Request() req, @Param('category_id') categoryId: string): Promise<void> {
    const restaurantId = req.user.restaurantId;

    return await this.categoriesService.deleteCategory(restaurantId, categoryId);
  }
}

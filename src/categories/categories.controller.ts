import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':restaurant_id')
  async getCategory(@Param('restaurant_id') restaurantId: string): Promise<Categories> {
    return await this.categoriesService.getCategoryById(restaurantId);
  }
}

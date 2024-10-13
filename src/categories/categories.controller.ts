import { Body, Controller, Delete, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';
import { CreateCategoryRequestDto } from './dtos/create-categories.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async createCategory(
    @Request() req,
    @Body() createCategoryRequestDto: CreateCategoryRequestDto,
  ): Promise<{ categoryId: string }> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      const categoryId = await this.categoriesService.createCategory(restaurantId, createCategoryRequestDto);
      return { categoryId };
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete(':categoryId')
  async deleteCategory(@Request() req, @Param('categoryId') categoryId: string): Promise<void> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;
      return await this.categoriesService.deleteCategory(restaurantId, categoryId);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

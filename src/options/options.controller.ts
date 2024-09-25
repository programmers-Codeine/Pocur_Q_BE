import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { Option } from './entities/options.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOptionDto } from './dtos/create-options.dro';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id/:menu_id')
  async createOption(
    @Param('restaurant_id') restaurantId: string,
    @Param('menu_id') menuId: string,
    @Body() createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    return await this.optionsService.createOption(restaurantId, menuId, createOptionDto);
  }
}

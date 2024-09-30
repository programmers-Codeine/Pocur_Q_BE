import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { Option } from './entities/options.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOptionRequestDto } from './dtos/create-options.dro';
import { UpdateOptionRequestDto } from './dtos/update-options.dto';

@UseGuards(JwtAuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post(':menu_id')
  async createOption(
    @Param('menu_id') menuId: string,
    @Body() createOptionRequestDto: CreateOptionRequestDto,
  ): Promise<Option> {
    return await this.optionsService.createOption(menuId, createOptionRequestDto);
  }

  @Put(':menu_id/:option_id')
  async updateOption(
    @Param('menu_id') menuId: string,
    @Param('option_id') optionId: string,
    @Body() updateOptionRequestDto: UpdateOptionRequestDto,
  ): Promise<Option> {
    return await this.optionsService.updateOption(menuId, optionId, updateOptionRequestDto);
  }

  @Delete(':menu_id/:option_id')
  async deleteOption(@Param('menu_id') menuId: string, @Param('option_id') optionId: string): Promise<void> {
    return await this.optionsService.deleteOption(menuId, optionId);
  }
}

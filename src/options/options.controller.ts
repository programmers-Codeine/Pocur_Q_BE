import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { Option } from './entities/options.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOptionRequestDto } from './dtos/create-options.dro';

@UseGuards(JwtAuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post(':menu_id')
  async createOptions(
    @Param('menu_id') menuId: string,
    @Body() createOptionsRequestDto: CreateOptionRequestDto[],
  ): Promise<Option[]> {
    return await this.optionsService.createOptions(menuId, createOptionsRequestDto);
  }
}

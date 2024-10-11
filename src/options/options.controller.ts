import { Body, Controller, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
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
    @Request() req,
  ): Promise<Option[]> {
    if (req.user.type === 'login') {
      return await this.optionsService.createOptions(menuId, createOptionsRequestDto);
    }
    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

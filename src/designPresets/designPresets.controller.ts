import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DesignPresetsService } from './designPresets.service';
import { CreateDesignPresetDto } from './dto/create-designPresets.dto';
import { UpdateDesignPresetDto } from './dto/update-designPresets.dto';
import { DesignPreset } from './entities/designPresets.entity';

@UseGuards(JwtAuthGuard)
@Controller('designPresets')
export class DesignPresetsController {
  constructor(private readonly designPresetsService: DesignPresetsService) {}

  @Get()
  async getDesignPresets(@Request() req): Promise<DesignPreset[]> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.designPresetsService.getDesignPresets(restaurantId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Get(':designPreset_id')
  async getDesignPresetById(@Request() req, @Param('designPreset_id') designPresetId: string): Promise<DesignPreset> {
    if (req.user.type === 'login') {
      return this.designPresetsService.getDesignPresetById(designPresetId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Post()
  async createDesignPreset(
    @Request() req,
    @Body() createDesignPresetDto: CreateDesignPresetDto,
  ): Promise<DesignPreset> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.designPresetsService.createDesignPreset(restaurantId, createDesignPresetDto);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Put(':designPreset_id')
  async updateDesignPreset(
    @Request() req,
    @Param('designPreset_id') designPresetId: string,
    @Body() updateDesignPresetDto: UpdateDesignPresetDto,
  ): Promise<DesignPreset> {
    if (req.user.type === 'login') {
      return this.designPresetsService.updateDesignPreset(designPresetId, updateDesignPresetDto);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }

  @Delete(':designPreset_id')
  async deleteDesignPreset(@Request() req, @Param('designPreset_id') designPresetId: string): Promise<void> {
    if (req.user.type === 'login') {
      return this.designPresetsService.deleteDesignPreset(designPresetId);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

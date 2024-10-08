import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
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
    const restaurantId = req.user.restaurantId;

    return this.designPresetsService.getDesignPresets(restaurantId);
  }

  @Get(':designPreset_id')
  async getDesignPresetById(@Param('designPreset_id') designPresetId: string): Promise<DesignPreset> {
    return this.designPresetsService.getDesignPresetById(designPresetId);
  }

  @Post()
  async createDesignPreset(
    @Request() req,
    @Body() createDesignPresetDto: CreateDesignPresetDto,
  ): Promise<DesignPreset> {
    const restaurantId = req.user.restaurantId;

    return this.designPresetsService.createDesignPreset(restaurantId, createDesignPresetDto);
  }

  @Put(':designPreset_id')
  async updateDesignPreset(
    @Param('designPreset_id') designPresetId: string,
    @Body() updateDesignPresetDto: UpdateDesignPresetDto,
  ): Promise<DesignPreset> {
    return this.designPresetsService.updateDesignPreset(designPresetId, updateDesignPresetDto);
  }

  @Delete(':designPreset_id')
  async deleteDesignPreset(@Param('designPreset_id') designPresetId: string): Promise<void> {
    return this.designPresetsService.deleteDesignPreset(designPresetId);
  }
}

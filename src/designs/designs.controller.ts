import { Body, Controller, Get, Param, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { Design } from './entities/designs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateDesignDto } from './dto/update-designs.dto';
import { ResponseDesignDto } from './dto/response-designs.dto';

@UseGuards(JwtAuthGuard)
@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Get()
  async getDesign(@Request() req): Promise<ResponseDesignDto> {
    const restaurantId = req.user.restaurantId;

    return this.designsService.getDesign(restaurantId);
  }

  @Put()
  async updateDesign(@Request() req, @Body() updateDesignDto: UpdateDesignDto): Promise<Design> {
    if (req.user.type === 'login') {
      const restaurantId = req.user.restaurantId;

      return this.designsService.updateDesign(restaurantId, updateDesignDto);
    }

    throw new UnauthorizedException('로그인이 필요한 기능입니다.');
  }
}

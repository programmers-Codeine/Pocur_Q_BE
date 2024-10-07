import { Body, Controller, Param, Put, Request, UseGuards } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { Design } from './entities/designs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateDesignDto } from './dto/update-designs.dto';

@UseGuards(JwtAuthGuard)
@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Put(':design_id')
  async updateDesign(
    @Param('design_id') designId: string,
    @Request() req,
    @Body() updateDesignDto: UpdateDesignDto,
  ): Promise<Design> {
    const restaurantId = req.user.restaurantId;

    return this.designsService.updateDesign(designId, restaurantId, updateDesignDto);
  }
}

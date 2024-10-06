import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { Design } from './entities/designs.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Get()
  async getDesign(@Request() req): Promise<Design> {
    const restaurantId = req.user.restaurantId;

    return this.designsService.getDesign(restaurantId);
  }
}

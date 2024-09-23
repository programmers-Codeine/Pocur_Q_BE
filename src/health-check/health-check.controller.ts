import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('health-check')
export class HealthCheckController {
  @UseGuards(JwtAuthGuard)
  @Get()
  checkHealth(): string {
    return 'OK';
  }
}

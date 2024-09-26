import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CallsService } from './calls.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCallRequestDto } from './dtos/create-calls.dto';
import { Call } from './entities/calls.entity';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id')
  async createOption(
    @Param('restaurant_id') restaurantId: string,
    @Body() createCallRequestDto: CreateCallRequestDto,
  ): Promise<Call> {
    return await this.callsService.createCall(restaurantId, createCallRequestDto);
  }
}

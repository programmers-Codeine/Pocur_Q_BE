import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CallsService } from './calls.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCallRequestDto } from './dtos/create-calls.dto';
import { Call } from './entities/calls.entity';
import { UpdateCallRequestDto } from './dtos/update-calls.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':restaurant_id')
  async getCalls(@Param('restaurant_id') restaurantId: string): Promise<Call[]> {
    return await this.callsService.getCalls(restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':restaurant_id')
  async createOption(
    @Param('restaurant_id') restaurantId: string,
    @Body() createCallRequestDto: CreateCallRequestDto,
  ): Promise<Call> {
    return await this.callsService.createCall(restaurantId, createCallRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':restaurant_id/:call_id')
  async updateCategory(
    @Param('restaurant_id') restaurantId: string,
    @Param('call_id') callId: string,
    @Body() updateCallRequestDto: UpdateCallRequestDto,
  ): Promise<Call> {
    return await this.callsService.updateCall(restaurantId, callId, updateCallRequestDto);
  }
}

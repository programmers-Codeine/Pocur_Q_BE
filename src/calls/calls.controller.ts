import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CallsService } from './calls.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCallRequestDto } from './dtos/create-calls.dto';
import { Call } from './entities/calls.entity';
import { UpdateCallRequestDto } from './dtos/update-calls.dto';

@UseGuards(JwtAuthGuard)
@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Get()
  async getCalls(@Request() req): Promise<Call[]> {
    const restaurantId = req.user.restaurantId;

    return await this.callsService.getCalls(restaurantId);
  }

  @Post()
  async createCall(@Request() req, @Body() createCallRequestDto: CreateCallRequestDto): Promise<Call> {
    const restaurantId = req.user.restaurantId;

    return await this.callsService.createCall(restaurantId, createCallRequestDto);
  }

  @Put(':call_id')
  async updateCall(
    @Request() req,
    @Param('call_id') callId: string,
    @Body() updateCallRequestDto: UpdateCallRequestDto,
  ): Promise<Call> {
    const restaurantId = req.user.restaurantId;

    return await this.callsService.updateCall(restaurantId, callId, updateCallRequestDto);
  }

  @Delete(':call_id')
  async deleteCall(@Request() req, @Param('call_id') callId: string): Promise<void> {
    const restaurantId = req.user.restaurantId;

    return await this.callsService.deleteCall(restaurantId, callId);
  }
}

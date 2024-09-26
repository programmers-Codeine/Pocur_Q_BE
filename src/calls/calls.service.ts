import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/calls.entity';
import { Repository } from 'typeorm';
import { CreateCallRequestDto } from './dtos/create-calls.dto';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call)
    private readonly callRepository: Repository<Call>,
  ) {}

  async createCall(restaurantId: string, createCallRequestDto: CreateCallRequestDto): Promise<Call> {
    const newCall = new Call();

    newCall.restaurant_id = restaurantId;
    newCall.call_name = createCallRequestDto.callName;

    return await this.callRepository.save(newCall);
  }
}

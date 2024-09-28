import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getCalls(restaurantId: string): Promise<Call[]> {
    const calls = await this.callRepository.find({ where: { restaurant_id: restaurantId } });
    if (!calls) {
      throw new NotFoundException('레스토랑의 카테고리를 찾지 못했습니다.');
    }

    return calls;
  }

  async createCall(restaurantId: string, createCallRequestDto: CreateCallRequestDto): Promise<Call> {
    const newCall = new Call();

    newCall.restaurant_id = restaurantId;
    newCall.call_name = createCallRequestDto.callName;

    return await this.callRepository.save(newCall);
  }
}
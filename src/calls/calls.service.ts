import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/calls.entity';
import { Repository } from 'typeorm';
import { CreateCallRequestDto } from './dtos/create-calls.dto';
import { UpdateCallRequestDto } from './dtos/update-calls.dto';

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

  async updateCall(restaurantId: string, callId: string, updateCallRequestDto: UpdateCallRequestDto): Promise<Call> {
    const call = await this.callRepository.findOne({ where: { id: callId, restaurant_id: restaurantId } });

    if (!call) {
      throw new NotFoundException(`이 ${callId}에 해당하는 카테고리가 없습니다.`);
    }

    call.call_name = updateCallRequestDto.callName;

    return await this.callRepository.save(call);
  }

  async deleteCall(restaurantId: string, callId: string): Promise<void> {
    const call = await this.callRepository.findOne({ where: { id: callId, restaurant_id: restaurantId } });

    if (!call) {
      throw new NotFoundException(`레스토랑 ID ${restaurantId}에 해당하는 호출 ID ${callId}를 찾을 수 없습니다.`);
    }

    await this.callRepository.remove(call);
  }
}

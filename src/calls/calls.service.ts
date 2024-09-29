import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/calls.entity';
import { Repository } from 'typeorm';
import { CreateCallRequestDto } from './dtos/create-calls.dto';
import { UpdateCallRequestDto } from './dtos/update-calls.dto';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity'; // Restaurant 엔티티 가져오기

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call)
    private readonly callRepository: Repository<Call>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async getCalls(restaurantId: string): Promise<Call[]> {
    const calls = await this.callRepository.find({ where: { restaurant: { id: restaurantId } } });
    if (!calls.length) {
      throw new NotFoundException('레스토랑의 호출을 찾지 못했습니다.');
    }

    return calls;
  }

  async createCall(restaurantId: string, createCallRequestDto: CreateCallRequestDto): Promise<Call> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`레스토랑 ID ${restaurantId}를 찾을 수 없습니다.`);
    }

    const newCall = this.callRepository.create({
      call_name: createCallRequestDto.callName,
      restaurant,
    });

    return await this.callRepository.save(newCall);
  }

  async updateCall(restaurantId: string, callId: string, updateCallRequestDto: UpdateCallRequestDto): Promise<Call> {
    const call = await this.callRepository.findOne({ where: { id: callId, restaurant: { id: restaurantId } } });

    if (!call) {
      throw new NotFoundException(`ID ${callId}에 해당하는 호출을 찾을 수 없습니다.`);
    }

    call.call_name = updateCallRequestDto.callName;

    return await this.callRepository.save(call);
  }

  async deleteCall(restaurantId: string, callId: string): Promise<void> {
    const call = await this.callRepository.findOne({ where: { id: callId, restaurant: { id: restaurantId } } });

    if (!call) {
      throw new NotFoundException(`레스토랑 ID ${restaurantId}에 해당하는 호출 ID ${callId}를 찾을 수 없습니다.`);
    }

    await this.callRepository.remove(call);
  }
}

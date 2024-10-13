import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Repository } from 'typeorm';

interface CustomerJwtPayload {
  restaurantId: string;
  tableNum: number;
  type: string;
}

@Injectable()
export class CustomerJwtService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly jwtService: JwtService,
  ) {}

  async customerJwt(restaurantId: string, tableNum: number): Promise<any> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`${restaurantId}에 해당하는 식당을 찾지 못했습니다.`);
    }

    const payload: CustomerJwtPayload = {
      restaurantId: restaurantId,
      tableNum: tableNum,
      type: 'customer',
    };

    const customerJwt = this.jwtService.sign(payload);
    return customerJwt;
  }
}

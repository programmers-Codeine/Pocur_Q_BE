import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/urls.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async createUrl(restaurant: Restaurant, tableNum: number): Promise<Url> {
    const newUrl = this.urlRepository.create({
      restaurant,
      url: `https://pocurq.shop/customer?restaurant_id=${restaurant.id}&table_num=${tableNum}`,
    });
    return await this.urlRepository.save(newUrl);
  }
}

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

  async findUrlsByRestaurantId(restaurantId: string): Promise<Url[]> {
    return await this.urlRepository.find({
      where: { restaurant: { id: restaurantId } },
      order: {
        url: 'ASC',
      },
    });
  }

  async createUrl(restaurant: Restaurant, tableNum: number): Promise<Url> {
    const newUrl = this.urlRepository.create({
      restaurant,
      url: `https://pocurq.shop/customer?restaurant_id=${restaurant.id}&table_num=${tableNum}`,
    });
    return await this.urlRepository.save(newUrl);
  }

  async deleteUrlByTableNumAndRestaurantId(restaurantId: string, tableNum: number): Promise<void> {
    const urlToDelete = await this.urlRepository.findOne({
      where: {
        restaurant: { id: restaurantId },
        url: `https://pocurq.shop/customer?restaurant_id=${restaurantId}&table_num=${tableNum}`,
      },
    });

    if (urlToDelete) {
      await this.urlRepository.remove(urlToDelete);
    }
  }
}

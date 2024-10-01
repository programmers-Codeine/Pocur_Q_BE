import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Restaurant } from '../entities/restaurants.entity';

export class UpdateRestaurantDto extends PartialType(OmitType(Restaurant, ['id', 'userId'] as const)) {}

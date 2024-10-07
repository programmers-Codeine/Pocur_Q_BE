import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurants.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}

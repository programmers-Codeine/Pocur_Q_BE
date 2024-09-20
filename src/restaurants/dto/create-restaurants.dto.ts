import { IsString, IsInt } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsInt()
  default_table_count: number;
}

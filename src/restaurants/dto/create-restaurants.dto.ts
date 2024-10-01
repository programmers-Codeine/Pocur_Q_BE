import { IsString, IsInt } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsInt()
  defaultTableCount: number;
}

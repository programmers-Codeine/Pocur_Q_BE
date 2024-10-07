import { IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsInt()
  defaultTableCount: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  introduce?: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  comment?: string;
}

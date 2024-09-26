import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMenuRequestDto {
  @IsString()
  @MaxLength(45)
  @IsOptional()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  menuName: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  menuDetail: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  menuImg: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  origin: string;

  @IsBoolean()
  isActivate: boolean = true;

  @IsBoolean()
  soldOut: boolean = false;
}

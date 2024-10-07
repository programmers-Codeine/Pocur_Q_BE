import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMenuRequestDto {
  @IsString()
  @MaxLength(45)
  @IsOptional()
  categoryId: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  menuName: string;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
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

  @IsBoolean()
  hot: boolean = false;

  @IsBoolean()
  new: boolean = false;

  @IsBoolean()
  isRunningOut: boolean = false;
}

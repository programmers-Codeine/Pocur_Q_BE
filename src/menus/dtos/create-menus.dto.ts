import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMenuRequestDto {
  @IsUUID()
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
  @MaxLength(100)
  @IsOptional()
  menuImg: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  origin: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  soldOut: boolean = false;

  @IsBoolean()
  hot: boolean = false;

  @IsBoolean()
  new: boolean = false;

  @IsBoolean()
  isRunningOut: boolean = false;
}

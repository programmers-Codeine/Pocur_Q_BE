import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @MaxLength(45)
  option_name: string;

  @IsInt()
  option_price: number;
}

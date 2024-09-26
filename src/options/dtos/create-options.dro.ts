import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateOptionRequestDto {
  @IsString()
  @MaxLength(45)
  optionName: string;

  @IsInt()
  optionPrice: number;
}

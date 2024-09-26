import { IsString, MaxLength } from 'class-validator';

export class CreateCategoryRequestDto {
  @IsString()
  @MaxLength(45)
  categoryName: string;
}

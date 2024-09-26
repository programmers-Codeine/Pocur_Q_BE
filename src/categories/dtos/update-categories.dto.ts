import { IsString, MaxLength } from 'class-validator';

export class UpdateCategoryRequestDto {
  @IsString()
  @MaxLength(45)
  categoryName: string;
}

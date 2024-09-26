import { IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MaxLength(45)
  category_name: string;
}

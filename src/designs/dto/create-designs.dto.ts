import { IsOptional, IsString } from 'class-validator';

export class CreateDesignDto {
  @IsOptional()
  @IsString()
  background?: string;

  @IsOptional()
  @IsString()
  bigText?: string;

  @IsOptional()
  @IsString()
  smallText?: string;

  @IsOptional()
  @IsString()
  box?: string;

  @IsOptional()
  @IsString()
  boxBorder?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  buttonBackground?: string;

  @IsOptional()
  @IsString()
  buttonText?: string;

  @IsOptional()
  @IsString()
  buttonBorder?: string;

  @IsOptional()
  @IsString()
  buttonActiveBackground?: string;

  @IsOptional()
  @IsString()
  buttonActiveText?: string;

  @IsOptional()
  @IsString()
  buttonActiveBorder?: string;

  @IsOptional()
  @IsString()
  labelHot?: string;

  @IsOptional()
  @IsString()
  labelNew?: string;

  @IsOptional()
  @IsString()
  labelSoldOut?: string;
}

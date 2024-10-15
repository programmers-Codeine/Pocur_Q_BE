import { IsString, IsOptional, IsUUID } from 'class-validator';

export class ResponseDesignDto {
  @IsUUID()
  designPresetId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  designImage: string | null;

  @IsOptional()
  @IsString()
  background: string | null;

  @IsOptional()
  @IsString()
  bigText: string | null;

  @IsOptional()
  @IsString()
  smallText: string | null;

  @IsOptional()
  @IsString()
  box: string | null;

  @IsOptional()
  @IsString()
  boxBorder: string | null;

  @IsOptional()
  @IsString()
  icon: string | null;

  @IsOptional()
  @IsString()
  buttonBackground: string | null;

  @IsOptional()
  @IsString()
  buttonText: string | null;

  @IsOptional()
  @IsString()
  buttonBorder: string | null;

  @IsOptional()
  @IsString()
  buttonActiveBackground: string | null;

  @IsOptional()
  @IsString()
  buttonActiveText: string | null;

  @IsOptional()
  @IsString()
  buttonActiveBorder: string | null;

  @IsOptional()
  @IsString()
  labelHot: string | null;

  @IsOptional()
  @IsString()
  labelNew: string | null;

  @IsOptional()
  @IsString()
  labelSoldOut: string | null;
}

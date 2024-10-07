import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDesignDto {
  @IsNotEmpty()
  @IsUUID()
  designPresetId: string;
}

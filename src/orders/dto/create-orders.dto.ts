import { IsUUID, IsInt, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  menuId: string;

  @IsInt()
  @IsNotEmpty()
  count: number;

  @IsInt()
  @IsNotEmpty()
  tableNum: number;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  optionIds: string[];
}

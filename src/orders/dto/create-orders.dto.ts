import { IsUUID, IsInt, IsNotEmpty, IsArray } from 'class-validator';

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
  @IsNotEmpty()
  optionIds: string[];
}

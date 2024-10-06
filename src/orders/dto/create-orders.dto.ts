import { IsUUID, IsInt, IsNotEmpty } from 'class-validator';

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
}

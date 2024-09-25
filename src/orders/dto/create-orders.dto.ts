import { IsUUID, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  menu_id: string;

  @IsInt()
  @IsNotEmpty()
  count: number;
}

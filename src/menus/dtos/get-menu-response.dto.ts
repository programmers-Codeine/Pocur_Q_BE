export class GetMenuResponseDto {
  id: string;
  categoryId: string;
  menuName: string;
  price: number;
  menuDetail: string;
  menuImg: string;
  origin: string;
  isActive: boolean;
  soldOut: boolean;
  hot: boolean;
  new: boolean;
  isRunningOut: boolean;
  created_at: Date;
  updated_at: Date;
  options: any[];
}

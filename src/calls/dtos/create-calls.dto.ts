import { IsString, MaxLength } from 'class-validator';

export class CreateCallRequestDto {
  @IsString()
  @MaxLength(45)
  callName: string;
}

import { IsString, MaxLength } from 'class-validator';

export class UpdateCallRequestDto {
  @IsString()
  @MaxLength(45)
  callName: string;
}

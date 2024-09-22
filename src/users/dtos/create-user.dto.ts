import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  //비밀번호 제한 할거면
  //@Matches(/^(?=.*[0-9])/,{message:'Password must contain at least one number' })
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  nickname: string;
}

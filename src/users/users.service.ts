import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinDto: CreateUserDto): Promise<void> {
    try {
      const { email, password, nickname } = joinDto;

      const existingUser = await this.userRepository.findOne({ where: { email: email } });
      if (existingUser) {
        throw new ConflictException('This email is already in use');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = this.userRepository.create({ email, password: hashedPassword, nickname });
      await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error during user registration:', error); // 에러 로깅
      throw new InternalServerErrorException('An error occurred while processing your request');
    }
  }

  async login(loginDto: LoginUserDto): Promise<{ accessToken: string; isFirstLogin: boolean }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('인증에 실패했습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('인증에 실패했습니다.');
    }

    // restaurants 테이블에서 해당 유저가 있는지 확인
    const isUserInRestaurants = await this.restaurantRepository.findOne({ where: { user_id: user.id } });

    // user가 없으면 처음 로그인한 것으로 간주
    const isFirstLogin = !isUserInRestaurants;

    const payload = { email: user.email, sub: user.id, nickname: user.nickname };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, isFirstLogin };
  }
}

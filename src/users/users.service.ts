import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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
}

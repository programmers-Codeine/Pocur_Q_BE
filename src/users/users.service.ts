import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JoinDto } from './dtos/join.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async join(joinData: JoinDto): Promise<void> {
    try {
      const { email, password, nickname } = joinData;

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('This email is already in use');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const id = uuidv4();

      await this.userRepository.createUser(email, hashedPassword, salt, nickname, id);
    } catch (error) {
      console.error('Error during user registration:', error); // 에러 로깅
      throw new InternalServerErrorException('An error occurred while processing your request');
    }
  }

  getHello(): string {
    return 'Hello World11!';
  }
}

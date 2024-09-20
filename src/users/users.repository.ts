import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(email: string, password: string, salt: string, nickname: string, id: string): Promise<Users> {
    const newUser = this.usersRepository.create({
      email,
      password,
      salt,
      nickname,
      id,
    });
    return this.usersRepository.save(newUser);
  }
}

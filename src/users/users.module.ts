import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import * as dotenv from 'dotenv';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { AuthModule } from 'src/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Restaurant]),
    forwardRef(() => RestaurantsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

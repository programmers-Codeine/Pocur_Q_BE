import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Restaurant]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    RestaurantsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

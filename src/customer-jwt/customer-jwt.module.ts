import { forwardRef, Module } from '@nestjs/common';
import { CustomerJwtController } from './customer-jwt.controller';
import { CustomerJwtService } from './customer-jwt.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantTable]),
    forwardRef(() => RestaurantsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT 비밀키 설정
      signOptions: { expiresIn: '30m' }, // JWT 만료 시간 설정
    }),
  ],
  controllers: [CustomerJwtController],
  providers: [CustomerJwtService],
  exports: [CustomerJwtService, TypeOrmModule],
})
export class CustomerJwtModule {}

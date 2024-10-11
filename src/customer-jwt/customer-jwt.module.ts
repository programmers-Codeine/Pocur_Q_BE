import { forwardRef, Module } from '@nestjs/common';
import { CustomerJwtController } from './customer-jwt.controller';
import { CustomerJwtService } from './customer-jwt.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantTable]),
    forwardRef(() => RestaurantsModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [CustomerJwtController],
  providers: [CustomerJwtService],
  exports: [CustomerJwtService, TypeOrmModule],
})
export class CustomerJwtModule {}

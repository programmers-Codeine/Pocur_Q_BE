import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { RestaurantTablesModule } from './restaurantTables/restaurantTables.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    RestaurantsModule,
    RestaurantTablesModule,
  ],
  controllers: [UsersController, RestaurantsController, HealthCheckController],
  providers: [],
})
export class AppModule {}

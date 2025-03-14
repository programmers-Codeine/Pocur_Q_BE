import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { RestaurantTablesModule } from './restaurantTables/restaurantTables.module';
import { UrlsModule } from './urls/urls.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { MenusController } from './menus/menus.controller';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { OptionsController } from './options/options.controller';
import { OptionsModule } from './options/options.module';
import { CallsModule } from './calls/calls.module';
import { ImgUploadModule } from './img-upload/imgUpload.module';
import { DesignsModule } from './designs/designs.module';
import { DesignPresetsModule } from './designPresets/designPresets.module';
import { CustomerJwtController } from './customer-jwt/customer-jwt.controller';
import { CustomerJwtModule } from './customer-jwt/customer-jwt.module';
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
    UrlsModule,
    CategoriesModule,
    AuthModule,
    MenusModule,
    OrdersModule,
    OptionsModule,
    CallsModule,
    ImgUploadModule,
    DesignsModule,
    DesignPresetsModule,
    CustomerJwtModule,
  ],
  controllers: [
    UsersController,
    RestaurantsController,
    HealthCheckController,
    MenusController,
    CategoriesController,
    OptionsController,
    CustomerJwtController,
  ],
  providers: [],
})
export class AppModule {}

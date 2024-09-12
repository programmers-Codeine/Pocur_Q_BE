import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [UsersModule, RestaurantsModule],
  controllers: [UsersController, RestaurantsController],
  providers: [],
})
export class AppModule {}

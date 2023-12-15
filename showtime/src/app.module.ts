import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { User, userSchema } from './users/user.schema';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mm:mm@cluster.moekb4z.mongodb.net/?retryWrites=true&w=majority',
    ),

    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    UsersModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    UsersService,
  ],
})
export class AppModule {}

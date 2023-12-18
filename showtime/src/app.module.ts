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

import { Band, bandSchema } from './bands/band.schema';
import { BandsModule } from './bands/bands.module';
import { BandsController } from './bands/bands.controller';
import { BandsService } from './bands/bands.service';

import { ConcertsModule } from './concerts/concerts.module';
import { Concert, concertSchema } from './concerts/concert.schema';
import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsService } from './concerts/concerts.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mm:mm@cluster.moekb4z.mongodb.net/?retryWrites=true&w=majority',
    ),

    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Band.name, schema: bandSchema }]),
    MongooseModule.forFeature([{ name: Concert.name, schema: concertSchema }]),
    UsersModule,
    BandsModule,
    ConcertsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    BandsController,
    ConcertsController,
    AuthController
  ],
  
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    UsersService,
    BandsService, ConcertsService
  ],
})
export class AppModule {}

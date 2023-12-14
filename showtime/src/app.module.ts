import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { User, userSchema } from './users/user.schema';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { Band, bandSchema } from './bands/band.schema';
import { BandsModule } from './bands/bands.module';
import { BandsController } from './bands/bands.controller';
import { BandsService } from './bands/bands.service';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mm:mm@cluster.moekb4z.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Band.name, schema: bandSchema }]),
    UsersModule,
    BandsModule,
    ConcertsModule,
  ],
  controllers: [AppController, UsersController, BandsController],
  providers: [AppService, UsersService, BandsService],
})
export class AppModule {}

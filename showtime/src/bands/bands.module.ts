import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';
import { Band, bandSchema } from './band.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Band.name, schema: bandSchema }]),
  ],
  controllers: [BandsController],
  providers: [BandsService],
})
export class BandsModule {}

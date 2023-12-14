import { Module } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Concert, concertSchema } from './concert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: concertSchema }]),
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}

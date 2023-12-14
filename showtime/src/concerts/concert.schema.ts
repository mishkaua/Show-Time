import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Concert {
  @Prop({ required: true })
  band: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  genre: string;

  @Prop()
  totalTickets: number;

  @Prop()
  remainingTickets: number;
}

export const concertSchema = SchemaFactory.createForClass(Concert);
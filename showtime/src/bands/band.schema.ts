import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Band {
  @Prop({ unique: true })
  title: string;

  @Prop({ required: true })
  genre: [string];

  @Prop()
  followers: [string];

  @Prop()
  concerts: [string];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const bandSchema = SchemaFactory.createForClass(Band);

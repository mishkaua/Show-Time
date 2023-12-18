import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { HydratedDocument } from 'mongoose';
//export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  favBands: [string];

  @Prop()
  concerts: [string];

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);

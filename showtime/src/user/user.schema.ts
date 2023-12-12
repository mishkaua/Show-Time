/* import mongoose from "mongoose";
const {Schema } = mongoose;

const userSchema = new Schema ({
    username: String,
    email:  String,
    password:   String,
    fav_bands: [String],
    is_admin: Boolean,
    concerts: [String]
}) */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fav_bands: [string];

  @Prop()
  concerts: [string];

  @Prop({ default: false })
  is_admin: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

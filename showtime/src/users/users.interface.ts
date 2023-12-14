import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly fav_bands: [string];
  readonly is_admin: boolean;
  readonly concerts: [string];
  readonly createdAt: Date;
}

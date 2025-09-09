import { Document } from 'mongoose';

export interface User extends Document {
  readonly fistName: string;
  readonly lastName: string;
  readonly email: string;
  readonly picture: string;
  readonly tkn: number;
}

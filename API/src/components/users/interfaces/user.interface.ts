import { Types } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  roomId?: Types.ObjectId;
  avatar?: string;
}

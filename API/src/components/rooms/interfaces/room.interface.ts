import { Types } from 'mongoose';

export interface IRoom {
  readonly title: string;
  readonly ownerId: Types.ObjectId;
  readonly description: string;
  readonly usersId: Array<Types.ObjectId>;
  readonly partnerId: Array<Types.ObjectId>;
}

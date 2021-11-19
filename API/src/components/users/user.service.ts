import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoomService } from '../rooms/room.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userRepository: Model<UserEntity>,
    private readonly roomService: RoomService,
  ) {}

  async list(): Promise<IUser[]> {
    return this.userRepository
      .find()
      .limit(20)
      .sort({ name: 1 })
      .populate('roomId')
      .lean();
  }

  async getById(id: string): Promise<IUser> {
    return this.userRepository
      .findById(Types.ObjectId(id))
      .populate('roomId')
      .lean();
  }

  async create(user): Promise<IUser> {
    const hash = await bcrypt.hash(user.password, 10);
    const createdUser = new this.userRepository(
      _.assignIn(user, { password: hash }),
    );
    return createdUser.save();
  }

  async remove(id: string): Promise<IUser> {
    const user = await this.getById(id);
    await this.roomService.leaveUserFromRoom(user.roomId, id);
    return this.userRepository.findByIdAndRemove(Types.ObjectId(id));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userRepository.findByIdAndUpdate(
      Types.ObjectId(id),
      updateUserDto,
      {
        new: true,
      },
    );
  }

  async joinToRoom(userId: string, roomId: string) {
    const user = await this.getById(userId);
    if (user.roomId !== null) {
      await this.roomService.leaveUserFromRoom(user.roomId, userId);
    }
    await this.roomService.joinUserToRoom(roomId, userId);
    return this.userRepository.findByIdAndUpdate(
      Types.ObjectId(userId),
      { roomId: Types.ObjectId(roomId) },
      { new: true },
    );
  }

  async leaveFromRoom(userId: string): Promise<IUser> {
    const user = await this.getById(userId);
    await this.roomService.leaveUserFromRoom(user.roomId, userId);
    return this.userRepository.findByIdAndUpdate(Types.ObjectId(userId), {
      roomId: null,
    });
  }

  async getAllUsersFromRoom(roomId: string): Promise<IUser[]> {
    return this.userRepository
      .find({ roomId })
      .limit(20)
      .sort({ name: 1 })
      .populate('roomId')
      .lean();
  }

  async removeAllUsersFromRoom(roomId: string) {
    return this.userRepository.updateMany(
      { roomId: Types.ObjectId(roomId) },
      { roomId: null },
      { new: true },
    );
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.userRepository.findOne({ email }).lean();
  }
}

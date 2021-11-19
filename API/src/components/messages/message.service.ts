import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageRepository: Model<MessageEntity>,
  ) {}
  async seed() {
    // const arr = [];
    // for (let step = 0; step < 50000; step++) {
    //   const obj = {
    //     ownerId: '60f92ce6939593111b7fb9f1',
    //     roomId: '60f92d7cebd79b227cf54111',
    //     text: `Step is: -> ${step}`,
    //   };
    //   arr.push(obj);
    // }
    // this.messageRepository.insertMany(arr);
    const count = 150;
    let totalTimeLean = 0;
    let totalTimeExec = 0;
    let totalTimeLeanAndExec = 0;
    for (let step = 0; step < count; step++) {
      const begin = Date.now();
      await this.messageRepository
        .findOne({ text: 'Step is: -> 26' })
        .lean()
        .exec();
      const end = Date.now();
      const timeSpent = end - begin;
      totalTimeLeanAndExec = totalTimeLeanAndExec + timeSpent;

      if (step === count - 1) {
        console.log(
          `average lean and exec: in ${count} steps`,
          totalTimeLeanAndExec / 50,
        );
      }
    }

    for (let step = 0; step < count; step++) {
      const begin = Date.now();
      await this.messageRepository.findOne({ text: 'Step is: -> 26' }).lean();
      const end = Date.now();
      const timeSpent = end - begin;
      totalTimeLean = totalTimeLean + timeSpent;
      if (step === count - 1) {
        console.log(`average lean: in ${count} steps`, totalTimeLean / 50);
      }
    }

    for (let step = 0; step < count; step++) {
      const begin = Date.now();
      await this.messageRepository.findOne({ text: 'Step is: -> 26' }).exec();
      const end = Date.now();
      const timeSpent = end - begin;
      totalTimeExec = totalTimeExec + timeSpent;
      if (step === count - 1) {
        console.log(`average exec: in ${count} steps`, totalTimeExec / 50);
      }
    }
  }

  async list(): Promise<IMessage[]> {
    return this.messageRepository
      .find()
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async getById(id: string): Promise<IMessage> {
    return this.messageRepository
      .findById(Types.ObjectId(id))
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async create(createMessageDto: CreateMessageDto): Promise<IMessage> {
    const newMessage = new this.messageRepository(createMessageDto);
    return newMessage.save();
  }

  async remove(id: string): Promise<IMessage> {
    return this.messageRepository.findByIdAndRemove(Types.ObjectId(id));
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<IMessage> {
    return this.messageRepository.findByIdAndUpdate(
      Types.ObjectId(id),
      updateMessageDto,
      {
        new: true,
      },
    );
  }

  async getAllMessagesByUser(ownerId: string): Promise<IMessage[]> {
    return this.messageRepository
      .find({ ownerId })
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async getAllMessagesByRoom(roomId: string): Promise<IMessage[]> {
    return this.messageRepository
      .find({ roomId })
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }
}

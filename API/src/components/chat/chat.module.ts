import { Module } from '@nestjs/common';
import ChatGateway from './sockets/chat.gateway';
import { MessageModule } from '../messages/message.module';
import { UserModule } from '../users/user.module';
import { RoomModule } from '../rooms/room.module';

@Module({
  imports: [UserModule, MessageModule, RoomModule],
  providers: [ChatGateway],
})
export default class ChatModule {}

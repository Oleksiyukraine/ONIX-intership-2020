import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../users/user.module';
import { RoomModule } from '../rooms/room.module';
import { MessageModule } from '../messages/message.module';
import AppController from './app.controller';
import AuthModule from '../auth/auth.module';
import ChatModule from '../chat/chat.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    RoomModule,
    MessageModule,
    MailModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

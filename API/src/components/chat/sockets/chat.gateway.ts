import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { UserService } from '../../users/user.service';
// import { MessageService } from '../../messages/message.service';
import { CreateMessageDto } from 'src/components/messages/dto/create-message.dto';
import { MessageService } from 'src/components/messages/message.service';
import { RoomService } from 'src/components/rooms/room.service';

@WebSocketGateway()
export default class ChatGateway {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.verbose('Initialized SOCKET');
  }

  async handleDisconnect(client: Socket) {
    console.log('handleDisconnect-SocketID: ', client.id);
  }

  async handleConnection(client: Socket) {
    console.log('handleConnection', client.id);
  }

  @SubscribeMessage('clientConnectToRoom')
  async handleMessageForClientConnectToRoom(client: Socket, roomId) {
    client.join(`room:${roomId}`, async (err) => {
      if (!err) {
        const messages = await this.messageService.getAllMessagesByRoom(roomId);
        this.wss.to(`room:${roomId}`).emit('messageList', messages);
      }
    });
  }

  @SubscribeMessage('clientSendMessage')
  async handleMessageForClientSendMessage(client: Socket, payload: CreateMessageDto,) {
    const newMsg = await this.messageService.create(payload);
    const message = await this.messageService.getById(newMsg._id);
    this.wss.to(`room:${payload.roomId}`).emit('newMessage', message);
  }

  // @SubscribeMessage('clientTyping')
  // async handleMessageForClientTyping(client: Socket, payload) {
  //   const user = await this.userService.getById(client.id);
  //   // client.to(user.roomId).emit('clientTyping', {
  //   //   user: {
  //   //     name: user.name,
  //   //     email: user.email,
  //   //     _id: user._id,
  //   //   },
  //   // });
  // }

  // @SubscribeMessage('userInfo')
  // async userInfo(client: Socket) {
  //   const user = await this.userService.getById(client.id);
  //   client.emit('userInfo', {
  //     name: user.name,
  //     email: user.email,
  //     _id: user._id,
  //   });
  // }
}

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    console.log(data);
    this.server.sockets.emit('receive_message', data);
  }
}

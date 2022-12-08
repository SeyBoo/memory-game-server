import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameService } from './game.service';
import { StartGameProps } from './types/game.interface';
import { v4 as uuid } from 'uuid';

@WebSocketGateway({ cors: true })
export class GameGateway {
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('start_game')
  createRoom(
    @MessageBody() data: StartGameProps,
    @ConnectedSocket() client: Socket,
  ) {
    const id: string = uuid();
    client.join(id);
    client.emit(
      'game_started',
      this.gameService.startGame({
        roomId: id,
        gridSize: data.gridSize,
        playerCount: data.playerCount,
        theme: data.theme,
      }),
    );
  }

  }
}

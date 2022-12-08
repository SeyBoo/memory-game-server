import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameService } from './game.service';
import { FlipImageProps, StartGameProps } from './types/game.interface';
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

  @SubscribeMessage('flip_card')
  flipCard(
    @MessageBody() data: FlipImageProps,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(
      'card_fliped',
      this.gameService.flipImage({
        index: data.index,
        value: data.value,
        roomId: [...client.rooms.values()][1],
      }),
    );
  }
}

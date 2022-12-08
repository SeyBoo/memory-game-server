import { Injectable } from '@nestjs/common';
import {
  FligImageReponse,
  FlipImageServiceProps,
  Game,
  GameArrayItem,
  gridSizeI,
  Room,
  StartGameProps,
  themeI,
} from './types/game.interface';
import GenerateShuffledImages from './utils/generateShuffledImages';
import GenerateShuffledNumbers from './utils/generateShuffledNumbers';

@Injectable()
export class GameService {
  private _rooms: Room[] = [
    {
      cards: {
        cardsChosen: [],
        cardsChosenIds: [],
        openCards: [],
      },
      game: {
        gridSize: 8,
        gridValue: [],
        moveCounter: 0,
        playerCount: 1,
        theme: 'icons',
        won: false,
      },
      roomId: '',
    },
  ];
  public get getRooms(): Room[] {
    return this._rooms;
  }
  public set setRooms(value: Room[]) {
    this._rooms = value;
  }

  generateShuffledGridValue(
    theme: themeI,
    gridSize: gridSizeI,
  ): GameArrayItem[] {
    if (theme === 'icons') {
      return GenerateShuffledImages(gridSize);
    } else {
      return GenerateShuffledNumbers(gridSize);
    }
  }

  startGame({ gridSize, playerCount, theme, roomId }: StartGameProps): Game {
    const newCreatedRoom: Room = {
      cards: {
        cardsChosen: [],
        cardsChosenIds: [],
        openCards: [],
      },
      game: {
        gridSize,
        gridValue: this.generateShuffledGridValue(theme, gridSize),
        moveCounter: 0,
        playerCount,
        theme: 'numbers',
        won: false,
      },
      roomId,
    };

    this.setRooms = [...this.getRooms, newCreatedRoom];

    return newCreatedRoom.game;
  }

  async joinGame() {
    return;
  }

  flipImage({
    value,
    index,
    roomId,
  }: FlipImageServiceProps): FligImageReponse | void {
    return;
}

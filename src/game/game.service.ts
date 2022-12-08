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

  getCurrentRoom(roomId): Room {
    return this.getRooms.filter((room) => room.roomId === roomId)[0];
  }

  updateCurrentRoom(roomId, updatedRoom: Room) {
    const roomWithoutCurrentOne = this.getRooms.filter(
      (room) => room.roomId !== roomId,
    );

    this.setRooms = [...roomWithoutCurrentOne, updatedRoom];
  }

  incrementMoveCounter(roomId) {
    const currentRoom = this.getCurrentRoom(roomId);

    const updatedRoom: Room = {
      ...currentRoom,
      game: {
        ...currentRoom.game,
        moveCounter: currentRoom.game.moveCounter + 1,
      },
    };

    this.updateCurrentRoom(roomId, updatedRoom);
  }

  checkIfWon(roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    if (
      currentRoom.game.gridValue.length === currentRoom.cards.openCards.length
    ) {
      const updatedRoom: Room = {
        ...currentRoom,
        game: {
          ...currentRoom.game,
          won: true,
        },
      };
      this.updateCurrentRoom(roomId, updatedRoom);
    }
  }

  addNewChosenCard({ value, index, roomId }: FlipImageServiceProps) {
    const currentRoom = this.getCurrentRoom(roomId);
    const updatedRoom: Room = {
      ...currentRoom,
      cards: {
        ...currentRoom.cards,
        cardsChosen: currentRoom.cards.cardsChosen.concat(value),
        cardsChosenIds: currentRoom.cards.cardsChosenIds.concat(index),
      },
    };
    this.updateCurrentRoom(roomId, updatedRoom);
  }

  checkShouldCleanChosenCards(roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    if (currentRoom.cards.cardsChosen.length === 2) {
      return true;
    } else {
      return false;
    }
  }

  cleanChosenCards(roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    const updatedRoom: Room = {
      ...currentRoom,
      cards: {
        ...currentRoom.cards,
        cardsChosen: [],
        cardsChosenIds: [],
      },
    };
    this.updateCurrentRoom(roomId, updatedRoom);
  }

  checkIfCardIsAlreadySelected(index: number, roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    if (
      currentRoom.cards.cardsChosenIds?.length === 1 &&
      currentRoom.cards.cardsChosenIds[0] === index
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkIfSelectedImageMatch(value: number, roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    if (currentRoom.cards.cardsChosen[0] === value) {
      return true;
    } else {
      return false;
    }
  }

  addNewFoundCards(value: number, roomId: string) {
    const currentRoom = this.getCurrentRoom(roomId);
    const updatedRoom: Room = {
      ...currentRoom,
      cards: {
        ...currentRoom.cards,
        openCards: currentRoom.cards.openCards?.concat([
          currentRoom.cards.cardsChosen[0],
          value,
        ]),
      },
    };
    this.updateCurrentRoom(roomId, updatedRoom);
  }

  flipImage({
    value,
    index,
    roomId,
  }: FlipImageServiceProps): FligImageReponse | void {
    let currentRoom = this.getCurrentRoom(roomId);

    if (this.checkIfCardIsAlreadySelected(index, roomId)) {
      return;
    }

    let shouldCleanChosenCard = false;

    if (currentRoom.cards.cardsChosen?.length === 1) {
      this.incrementMoveCounter(roomId);
      if (this.checkIfSelectedImageMatch(value, roomId)) {
        this.addNewFoundCards(value, roomId);
        this.checkIfWon(roomId);
      }
    }

    this.addNewChosenCard({ value, index, roomId });

    if (this.checkShouldCleanChosenCards(roomId)) {
      shouldCleanChosenCard = true;
      setTimeout(() => {
        this.cleanChosenCards(roomId);
      }, 700);
    }

    currentRoom = this.getCurrentRoom(roomId);

    return {
      ...currentRoom,
      shouldCleanChosenCard,
    };
  }
}

export type gridSizeI = 8 | 18;

export type themeI = 'icons' | 'numbers';

export type playerCountI = 1 | 2 | 3 | 4;

export interface GameArrayItem {
  index: number;
  image?: string;
}

export interface StartGameProps {
  roomId: string;
  gridSize: gridSizeI;
  theme: themeI;
  playerCount: playerCountI;
}

export interface GameCardsI {
  cardsChosenIds: number[];
  cardsChosen: number[];
  openCards: number[];
}

export interface Game {
  gridValue: GameArrayItem[];
  theme: themeI;
  playerCount: playerCountI;
  moveCounter: number;
  gridSize: gridSizeI;
  won: boolean;
}

export interface FlipImageProps {
  value: number;
  index: number;
}

export interface FlipImageServiceProps {
  value: number;
  index: number;
  roomId: string;
}

export interface FligImageReponse {
  game: Game;
  cards: GameCardsI;
  shouldCleanChosenCard: boolean;
}

export interface Room {
  roomId: string;
  game: Game;
  cards: GameCardsI;
}

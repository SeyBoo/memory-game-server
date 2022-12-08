import Shuffle from './shuffle';
import { GameArrayItem } from '../types/game.interface';

const path = 'http://localhost:8888/public/';
const iconList = [
  path + 'anchor.png',
  path + 'bug.png',
  path + 'car.png',
  path + 'flask.png',
  path + 'flutbol.png',
  path + 'moon.png',
  path + 'snowflake.png',
  path + 'sun.png',
  path + 'hand-spock.png',
  path + 'building.png',
  path + 'cloud.png',
  path + 'feather.png',
  path + 'fish.png',
  path + 'mountain.png',
  path + 'ticket.png',
  path + 'mouskito.png',
];

const GenerateShuffledImages = (grid: 8 | 18) => {
  const arr: GameArrayItem[] = [];

  for (let i = 1; i < grid + 1; i++) {
    arr.push({
      image: iconList[i],
      index: i,
    });
    arr.push({
      image: iconList[i],
      index: i,
    });
  }

  return Shuffle(arr);
};

export default GenerateShuffledImages;

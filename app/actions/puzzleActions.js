import {
  PZ_SHUFFLE,
  PZ_MOVE,
} from './actionTypes';

export const shuffleField = () => ({
  type: PZ_SHUFFLE,
});

export const moveSquare = (squareIndex) => ({
  type: PZ_MOVE,
  payload: {
    squareIndex,
  },
});

import {
  MS_GENERATE_FIELD,
  MS_OPEN_SQUARE,
  MS_MARK_SQUARE,
} from './actionTypes';

export const generateField = () => ({
  type: MS_GENERATE_FIELD,
});

export const openSquare = (squareIndex) => ({
  type: MS_OPEN_SQUARE,
  payload: {
    squareIndex,
  },
});

export const markSquare = (squareIndex) => ({
  type: MS_MARK_SQUARE,
  payload: {
    squareIndex,
  },
});
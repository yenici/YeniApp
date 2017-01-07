import {
  PZ_SHUFFLE,
  PZ_MOVE,
} from '../actions/actionTypes';

const PZ_SIZE = 4;
const PZ_NUMBER_OF_MOVES_TO_SHUFFLE = 100;

export const PZ_SQUARE_FROZEN = -1;

const initialState = {
  rowsCnt: PZ_SIZE,
  colsCnt: PZ_SIZE,
  field: shuffleField(PZ_SIZE, PZ_SIZE),
  finished: false,
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case PZ_SHUFFLE:
      return {
        ...state,
        field: shuffleField(state.rowsCnt, state.colsCnt),
        finished: false,
      };
    case PZ_MOVE:
      return moveSquare(state, action.payload.squareIndex);
    default:
      return state;
  }
};

function getNeighbors(rowsCnt, colsCnt, pos) {
  const neighbors = [];
  const squaresCnt = rowsCnt * colsCnt;
  if (pos + colsCnt < squaresCnt)
    neighbors.push(pos + colsCnt);
  if (pos - colsCnt >= 0)
    neighbors.push(pos - colsCnt);
  if ((pos + 1) % colsCnt !== 0 && pos + 1 < squaresCnt)
    neighbors.push(pos + 1);
  if (pos % colsCnt !== 0 && pos - 1 >= 0)
    neighbors.push(pos - 1);
  return neighbors;
}

function shuffleField(rowsCnt, colsCnt) {
  const squaresCnt = rowsCnt * colsCnt;
  let currentSpaceIndex = squaresCnt - 1;
  const field = new Array(squaresCnt).fill({})
    .map((square, index) => ({
      index,
      value: index === currentSpaceIndex ? 0 : index + 1,
      moveTo: PZ_SQUARE_FROZEN,
    }));
  for (let i = 0; i < PZ_NUMBER_OF_MOVES_TO_SHUFFLE; i += 1) {
    let neighbors = getNeighbors(rowsCnt, colsCnt, currentSpaceIndex);
    let squareToExchange = neighbors[Math.floor(Math.random() * neighbors.length)];
    if (squareToExchange !== currentSpaceIndex) {
      field[currentSpaceIndex].value = field[squareToExchange].value;
      field[squareToExchange].value = 0;
      currentSpaceIndex = squareToExchange;
    }
  }
  getNeighbors(rowsCnt, colsCnt, currentSpaceIndex)
    .forEach(index => field[index].moveTo = currentSpaceIndex);
  return field;
}

function moveSquare(state, index) {
  if (state.field[index].moveTo !== PZ_SQUARE_FROZEN) {
    const moveIndex = state.field[index].moveTo;
    const field = state.field
      .map(square => square.moveTo === PZ_SQUARE_FROZEN ? square : {...square, moveTo: PZ_SQUARE_FROZEN});
    field[moveIndex] = { ...field[moveIndex], value: field[index].value };
    field[index] = { ...field[index], value: 0 };
    getNeighbors(state.rowsCnt, state.colsCnt, index)
      .forEach(i => field[i] = { ...field[i], moveTo: index });
    let i = 0;
    let finished = true;
    const squaresCnt = state.rowsCnt * state.colsCnt;
    while (finished && i < squaresCnt - 1) {
      if (field[i].value !== i + 1) {
        finished = false;
      }
      i += 1;
    }
    return { ...state, field, finished };
  } else {
    return state;
  }
}

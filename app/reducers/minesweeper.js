import {
  MS_GENERATE_FIELD,
  MS_OPEN_SQUARE,
  MS_MARK_SQUARE,
} from '../actions/actionTypes';

const MS_ROWS = 3;
const MS_COLS = 3;
const MS_MINES = 2;

const initialState = {
  rowsCnt: MS_ROWS,
  colsCnt: MS_COLS,
  minesCnt: MS_MINES,
  field: generateField(MS_ROWS, MS_COLS, MS_MINES),
  status: { finished: false, won: false },
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case MS_GENERATE_FIELD:
      return {
        ...state,
        field: generateField(state.rowsCnt, state.colsCnt, state.minesCnt),
        status: { finished: false, won: false },
      };
    case MS_OPEN_SQUARE:
      return openSquare(state, action.payload.squareIndex);
    case MS_MARK_SQUARE:
      return markSquare(state, action.payload.squareIndex);
    default:
      return state;
  }
};

function getNeighbors(field, rowsCnt, colsCnt, pos, filter) {
  const get1dPosition = (r, c) => r * colsCnt + c;
  const get2dPosition = (p) => ({
    row: Math.floor(p / colsCnt),
    col: p % colsCnt,
  });
  const filterFn = filter || (() => true);
  const neighbors = [];
  const pos2d = get2dPosition(pos);
  for (let i = -1; i < 2; i += 1) {
    let row = pos2d.row + i;
    if (row >= 0 && row < rowsCnt) {
      for (let j = -1; j < 2; j += 1) {
        let col = pos2d.col + j;
        if (col >= 0 && col < colsCnt) {
          let neighborSquare = get1dPosition(row, col);
          if (filterFn(field[neighborSquare])) {
            neighbors.push(field[neighborSquare]);
          }
        }
      }
    }
  }
  return neighbors;
}

function generateField(rowsCnt, colsCnt, minesCnt) {
  const squaresCnt = rowsCnt * colsCnt;
  const field = new Array(squaresCnt).fill({})
    .map((square, index) => ({
      index,
      isMined: false,
      isMarked: false,
      isVisible: false,
      minedNeighborsCnt: 0
    }));
  let counter = minesCnt;
  while (counter > 0) {
    let minePosition = Math.floor(Math.random() * squaresCnt);
    if (!field[minePosition].isMined) {
      field[minePosition].isMined = true;
      counter -= 1;
      const neighbors = getNeighbors(field, rowsCnt, colsCnt, minePosition);
      neighbors.forEach(square => field[square.index].minedNeighborsCnt += 1 );
    }
  }
  return field;
}

function openSquare(state, index) {
  if (!state.status.finished && !state.field[index].isVisible && !state.field[index].isMarked) {
    const field = [...state.field];
    if (field[index].minedNeighborsCnt === 0) {
      const squaresWith0MinedNeighbors = [index];
      let curSquareIndexWith0MinedNeighbors;
      let neighbors;
      while (squaresWith0MinedNeighbors.length) {
        curSquareIndexWith0MinedNeighbors = squaresWith0MinedNeighbors.shift();
        field[curSquareIndexWith0MinedNeighbors] = { ...field[curSquareIndexWith0MinedNeighbors], isVisible: true };
        neighbors = getNeighbors(
          field,
          state.rowsCnt,
          state.colsCnt,
          curSquareIndexWith0MinedNeighbors,
          square => !square.isVisible
        );
        neighbors.forEach((square) => {
          if (square.minedNeighborsCnt !== 0) {
            field[square.index] = { ...field[square.index], isMarked: false, isVisible: true };
          } else {
            squaresWith0MinedNeighbors.push(square.index);
          }
        });
      }
    } else {
      field[index] = { ...field[index], isVisible: true };
    }
    if (field[index].isMined) {
      return {...state, field, status: { finished: true, won: false } };
    } else {
      return {...state, field };
    }
  }
  return state;
}

function markSquare(state, index) {
  if (!state.status.finished && !state.field[index].isVisible) {
    const field = [
      ...state.field.slice(0, index),
      Object.assign({}, state.field[index], { isMarked: !state.field[index].isMarked }),
      ...state.field.slice(index + 1)
    ];
    const markStatus = field.reduce((res, square) => ({
      marked: res.marked + (square.isMarked ? 1 : 0),
      right: res.right + ((square.isMarked && square.isMined) ? 1 : 0),
    }), { marked: 0, right: 0 });
    if (state.minesCnt === markStatus.marked && state.minesCnt === markStatus.right) {
      const status = { finished: true, won: true };
      return { ...state, field, status };
    } else {
      return { ...state, field };
    }
  }
  return state;
}

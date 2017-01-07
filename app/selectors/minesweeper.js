import { createSelector } from 'reselect';

const getSquares = state => state.minesweeper.field;
const getMinesCnt = state => state.minesweeper.minesCnt;

const getMarkedSquaresCnt = createSelector(
  [getSquares, getMinesCnt],
  (squares, mines) => (mines - squares.filter(square => square.isMarked).length)
);

export default getMarkedSquaresCnt;

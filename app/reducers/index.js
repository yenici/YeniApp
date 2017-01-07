import { combineReducers } from 'redux';

import minesweeper from './minesweeper';
import puzzle from './puzzle';

export default combineReducers({
  minesweeper,
  puzzle,
});

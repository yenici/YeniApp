import { combineReducers } from 'redux';

import routes from './routes';
import minesweeper from './minesweeper';
import puzzle from './puzzle';

export default combineReducers({
  routes,
  minesweeper,
  puzzle,
});

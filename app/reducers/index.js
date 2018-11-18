import { combineReducers } from 'redux';
import asyncTask from './asyncTask';
import countdown from './countdown';
import data from './data';
import modal from './modal';

const reducer = combineReducers({
  asyncTask,
  countdown,
  data,
  modal,
});

export default reducer;

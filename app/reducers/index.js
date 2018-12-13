import { combineReducers } from 'redux';
import asyncTask from './asyncTask';
import data from './data';
import modal from './modal';

const reducer = combineReducers({
  asyncTask,
  data,
  modal,
});

export default reducer;

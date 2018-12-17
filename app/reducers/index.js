import { combineReducers } from 'redux';
import asyncTask from './asyncTask';
import data from './data';
import errorLoadPicture from './errorLoadPicture';
import modal from './modal';

const reducer = combineReducers({
  asyncTask,
  data,
  errorLoadPicture,
  modal,
});

export default reducer;

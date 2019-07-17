import { combineReducers } from 'redux';
import data from './data';
import errorLoadPicture from './errorLoadPicture';
import modal from './modal';

const reducer = combineReducers({
  data,
  errorLoadPicture,
  modal,
});

export default reducer;

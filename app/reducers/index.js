import { combineReducers } from 'redux';
import countdown from './countdown';
import modal from './modal';

const reducer = combineReducers({
  countdown,
  modal,
});

export default reducer;

import { combineReducers } from 'redux';
import countdown from './countdown';
import modal from './modal';
import router from './router';

const reducer = combineReducers({
  countdown,
  modal,
  router,
});

export default reducer;

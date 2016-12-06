import { combineReducers } from 'redux';
import router from './router';
import countdown from './countdown';

const reducer = combineReducers({
  router,
  countdown,
});

export default reducer;

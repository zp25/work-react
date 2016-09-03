import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducer';

const logger = createLogger();

const initState = {
  // 倒计时
  countdown: 60,
};

const store = createStore(
  reducer,
  initState,
  applyMiddleware(logger)
);

export default store;

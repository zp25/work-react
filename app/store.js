import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import createLogger from 'redux-logger';

const logger = createLogger();

const initState = {
  // 是否开发环境
  dev: true,
  // 倒计时
  countdown: 60,
};

const store = createStore(
  reducer,
  initState,
  applyMiddleware(logger)
);

export default store;

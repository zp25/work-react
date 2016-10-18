import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducer';

const midware = [];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();

  midware.push(logger);
}

const initState = {
  // 倒计时
  countdown: 60,
};

const store = createStore(
  reducer,
  initState,
  applyMiddleware(...midware)
);

export default store;

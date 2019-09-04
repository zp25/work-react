import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/sagas';
import reducer from '@/reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(
  sagaMiddleware,
);

export default (preloadedState = {}) => {
  const store = createStore(reducer, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

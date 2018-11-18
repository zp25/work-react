import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from 'sagas';
import reducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(
  thunk,
  sagaMiddleware,
);

export default () => {
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

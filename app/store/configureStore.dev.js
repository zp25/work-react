import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import DevTools from 'containers/devtools';
import rootSaga from 'sagas';
import reducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

// persist debug sessions
const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const enhancer = compose(
  // applyMiddleware必须在DevTools.instrument之前
  applyMiddleware(
    thunk,
    sagaMiddleware,
  ),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
);

export default () => {
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(rootSaga);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => (
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    ));
  }

  return store;
};

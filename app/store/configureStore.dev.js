/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import DevTools from '@/containers/devtools';
import rootSaga from '@/sagas';
import reducer from '@/reducers';

const sagaMiddleware = createSagaMiddleware();

// persist debug sessions
const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const enhancer = compose(
  // applyMiddleware必须在DevTools.instrument之前
  applyMiddleware(
    immutableStateInvariant(),
    sagaMiddleware,
  ),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
);

export default (preloadedState = {}) => {
  const store = createStore(reducer, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => (
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    ));
  }

  return store;
};

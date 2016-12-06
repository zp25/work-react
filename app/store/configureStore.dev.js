import { applyMiddleware, createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import DevTools from 'containers/devtools';
import reducer from '../reducers';

// persist debug sessions
const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const enhancer = compose(
  // applyMiddleware必须在DevTools.instrument之前
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
);

export default (initState) => {
  const store = createStore(reducer, initState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => (
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    ));
  }

  return store;
};

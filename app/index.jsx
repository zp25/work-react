import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createBrowserHistory from 'history/createBrowserHistory';
import Root from 'containers/root';
import configureStore from 'store/configureStore';
import { setRouter } from 'actions';

const history = createBrowserHistory();

const initState = {
  router: {
    location: history.location,
    action: history.action,
  },
  countdown: 0,
};

const store = configureStore(initState);

history.listen((location, action) => {
  store.dispatch(setRouter({ location, action }));
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  // Hot reload components
  module.hot.accept('containers/root', () => { render(Root); });
}

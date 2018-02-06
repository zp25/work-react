import React from 'react';
import ReactDOM from 'react-dom';
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
};

const store = configureStore(initState);

history.listen((location, action) => {
  store.dispatch(setRouter({ location, action }));
});

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);

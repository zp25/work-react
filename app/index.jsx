import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from 'containers/root';
import configureStore from 'store/configureStore';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  // Hot reload components
  module.hot.accept('containers/root', () => {
    const RootContainer = require('containers/root').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <RootContainer store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

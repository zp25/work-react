/* eslint react/prop-types: off */

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { // eslint-disable-line import/no-extraneous-dependencies
  hot,
  // setConfig,
} from 'react-hot-loader';
import App from 'containers/app';
import DevTools from 'containers/devtools';

// setConfig({ logLevel: 'debug' });

const Root = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <DevTools />
    </Fragment>
  </Provider>
);

export default hot(module)(Root);

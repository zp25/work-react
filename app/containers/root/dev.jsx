/* eslint react/prop-types: off */

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import {
  hot,
  // setConfig,
} from 'react-hot-loader';
import App from 'containers/app';
import DevTools from 'containers/devtools';

import 'styles/root.scss';

// setConfig({ logLevel: 'debug' });

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Fragment>
      <App history={history} />
      <DevTools />
    </Fragment>
  </Provider>
);

export default hot(module)(Root);

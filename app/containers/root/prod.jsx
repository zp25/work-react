/* eslint react/prop-types: off */

import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/app';

import 'styles/root.scss';
import 'normalize.css/normalize.css';

export default ({ store, history }) => (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

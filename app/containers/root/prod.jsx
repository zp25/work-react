/* eslint react/prop-types: off */

import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/app';

import 'styles/root.scss';

export default ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

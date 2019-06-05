/* eslint import/no-extraneous-dependencies: off */

// @link https://github.com/gaearon/react-hot-loader#getting-started
import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/root';
import configureStore from 'store/configureStore';

// preloadedState

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);

/* eslint react/prop-types: off, import/no-extraneous-dependencies: off */

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from '@/containers/app';
import DevTools from '@/containers/devtools';

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

export default hot(Root);

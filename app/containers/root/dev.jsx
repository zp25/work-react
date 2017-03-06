/* eslint react/prop-types: off */

import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/app';
import DevTools from 'containers/devtools';

import 'styles/root.scss';

export default ({ store, history }) => (
  <Provider store={store}>
    <div className="dev">
      <App history={history} />
      <DevTools />
    </div>
  </Provider>
);

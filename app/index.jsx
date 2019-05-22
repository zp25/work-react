import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/root';
import configureStore from 'store/configureStore';

import '../node_modules/normalize.css/normalize.css';
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);

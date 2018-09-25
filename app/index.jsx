import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/root';
import configureStore from 'store/configureStore';

const initState = {};
const store = configureStore(initState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);

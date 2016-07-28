import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';

render(
  // react-redux连接器
  <Provider store={store}>{router}</Provider>,
  document.querySelector('#root')
);

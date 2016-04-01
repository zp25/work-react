import React from 'react';
import ReactDOM from 'react-dom';
import Foo from './foo';

import '../styles/main.scss';

const text = __DEV__ ? 'dev' : 'pro';

ReactDOM.render(
  <Foo>{`${text}: Hello World!`}</Foo>,
  document.querySelector('main')
);

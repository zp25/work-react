import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import Foo from './components/foo';
import Bar from './components/bar';

import './styles/styles';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Foo} />
      <Route path="bar" component={Bar} />
    </Route>
  </Router>
), document.querySelector('#root'));

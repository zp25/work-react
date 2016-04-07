import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Home from './components/home';
import Foo from './components/foo';
import Bar from './components/bar';

import './styles/main.scss';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" components={Home}>
      <IndexRoute components={Foo} />
      <Route path="/bar" components={Bar} />
    </Route>
  </Router>
), document.querySelector('#root'));

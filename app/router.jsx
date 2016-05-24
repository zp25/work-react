import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from './containers/appContainer';
import FooContainer from './containers/fooContainer';
import BarContainer from './containers/barContainer';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={FooContainer} />
      <Route path="bar" component={BarContainer} />
    </Route>
  </Router>
);

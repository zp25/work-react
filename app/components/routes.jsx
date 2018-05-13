import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import Home from 'containers/home';
import Foo from 'containers/foo';
import Bar from 'containers/bar';

const routes = [
  {
    id: 1,
    path: '/foo',
    exact: true,
    strict: true,
    // props: { match, location }
    main: props => <Foo {...props} />,
  },
  {
    id: 2,
    path: '/bar',
    exact: true,
    strict: true,
    main: props => <Bar {...props} />,
  },
];

const Routes = ({ location }) => (
  <TransitionGroup component={null}>
    <CSSTransition
      key={location.key}
      classNames="fade"
      timeout={{
        enter: 300,
        exit: 100,
      }}
    >
      <Switch location={location}>
        {
          routes.map((route) => {
            const {
              id,
              main,
              ...rest
            } = route;

            return (
              <Route
                key={id}
                render={main}
                {...rest}
              />
            );
          })
        }
        <Route component={Home} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

Routes.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
};

export default withRouter(Routes);

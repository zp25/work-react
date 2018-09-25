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
import Page from 'containers/page';

const routes = [
  {
    id: 1,
    path: '/:page',
    exact: true,
    strict: true,
    main: Page,
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
                component={main}
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

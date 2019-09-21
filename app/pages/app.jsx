import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import routes from '@/routes';
import Helmet from '@/components/helmet';
import Spinner from '@/components/spinner';

import 'normalize.css/normalize.css';
import style from './app.module.scss';

const Links = () => (
  <ul className={style.nav}>
    {
      routes.map(({
        id,
        title,
        component,
        ...rest
      }) => (
        <li key={id}>
          <NavLink
            activeClassName={style.active}
            {...rest}
          >
            {title}
          </NavLink>
        </li>
      ))
    }
  </ul>
);

const App = ({
  env,
}) => (
  <div className={style.app}>
    <Helmet />

    <Links />

    <p className={style.text}>{env}</p>

    <Suspense fallback={<Spinner />}>
      <Switch>
        {
          routes.map(({
            id,
            to: path,
            component: Page,
            ...rest
          }) => (
            <Route
              key={id}
              path={path}
              component={Page}
              {...rest}
            />
          ))
        }
      </Switch>
    </Suspense>
  </div>
);

App.propTypes = {
  env: PropTypes.string.isRequired,
};

export default App;

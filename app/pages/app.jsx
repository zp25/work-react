import React, { Suspense } from 'react';
import {
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import Helmet from 'components/helmet';
import Spinner from 'components/spinner';

import 'normalize.css/normalize.css';
import style from './app.scss';

import routes from '../routes';

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

const App = () => (
  <div className={style.app}>
    <Helmet />

    <Links />

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

export default App;

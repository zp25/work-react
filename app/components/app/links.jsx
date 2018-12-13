import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import style from './style.scss';

const links = [
  {
    id: 1,
    title: 'Foo',
    to: '/foo',
    exact: true,
    strict: true,
  },
  {
    id: 2,
    title: 'Bar',
    to: '/bar',
    exact: true,
    strict: true,
  },
];

const Links = () => (
  <ul className={cx(style.nav, style.container)}>
    {
      links.map(({
        id,
        title,
        ...link
      }) => (
        <li key={id}>
          <NavLink activeClassName={style.active} {...link}>
            {title}
          </NavLink>
        </li>
      ))
    }
  </ul>
);

export default Links;

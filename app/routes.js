import { lazy } from 'react';
import pMinDelay from 'p-min-delay';

const routes = [
  {
    id: 1,
    title: '首页',
    to: '/home',
    exact: true,
    strict: true,
    component: lazy(() => pMinDelay(
      import(/* webpackChunkName: "home" */ '@/containers/home'),
      600,
    )),
  },
  {
    id: 2,
    title: '异步',
    to: '/async',
    exact: true,
    strict: true,
    component: lazy(() => pMinDelay(
      import(/* webpackChunkName: "async" */ '@/containers/async'),
      600,
    )),
  },
];

export default routes;

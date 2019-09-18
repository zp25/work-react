import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import 'normalize.css/normalize.css';
import style from '../app/pages/app.scss';

const AppDecorator = storyFn => <div className={style.app}>{storyFn()}</div>;

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.jsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
addDecorator(AppDecorator);

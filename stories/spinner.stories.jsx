import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '../app/components/spinner';

import '../node_modules/normalize.css/normalize.css';
import '../app/pages/app.scss';

storiesOf('Spinner', module)
  .add('default', () => (
    <Spinner />
  ));

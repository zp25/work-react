import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '../app/components/utils/spinner';

import '../node_modules/normalize.css/normalize.css';
import '../app/index.scss';

storiesOf('Spinner', module)
  .add('default', () => (
    <Spinner />
  ));

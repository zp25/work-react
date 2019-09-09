import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '../app/components/spinner';

storiesOf('Spinner', module)
  .add('default', () => (
    <Spinner />
  ));

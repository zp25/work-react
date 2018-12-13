import React from 'react';
import cx from 'classnames';

import style from './style.scss';

const arr = [...new Array(12).keys()].map(d => ({
  id: d + 1,
}));

const Spinner = () => (
  <div className={style['sk-circle']}>
    {
      arr.map(d => (
        <span
          key={d.id}
          className={cx(style[`sk-circle${d.id}`], style['sk-child'])}
        />
      ))
    }
  </div>
);

export default Spinner;

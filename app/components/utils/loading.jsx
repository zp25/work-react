import React from 'react';
import cx from 'classnames';

import style from 'styles/utils/modal.scss';

const arr = [...new Array(12).keys()].map(d => ({
  id: d + 1,
}));

const Loading = () => (
  <div className={style.loading}>
    {
      arr.map(d => (
        <span
          key={d.id}
          className={cx(style.loading__circle, style[`loading__circle--${d.id}`])}
        />
      ))
    }
  </div>
);

export default Loading;

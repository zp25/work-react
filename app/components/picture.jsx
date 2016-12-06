import React from 'react';

import style from 'styles/picture.scss';
import zpWebp from 'images/zp.webp';
import zpJpg from 'images/zp.jpg';

const Picture = () => (
  <picture className={style.picture}>
    <source srcSet={zpWebp} type="image/webp" />
    <img src={zpJpg} alt="zp" />
  </picture>
);

export default Picture;

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './style.scss';

const Picture = memo(({
  className,
  srcSet: {
    src: srcSet,
    ...main
  },
  fallback,
}) => (
  <picture className={cx(style.picture, className)}>
    <source srcSet={srcSet} {...main} />
    {
      fallback.map(({
        id,
        src,
        alt,
        ...others
      }) => (
        <img
          key={id}
          className={style.fallback}
          src={src}
          alt={alt}
          {...others}
        />
      ))
    }
  </picture>
));

Picture.defaultProps = {
  className: '',
};

Picture.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  srcSet: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
  fallback: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Picture;

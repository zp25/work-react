import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './style.scss';

const Button = memo(({
  className,
  children,
  onClick,
  ...props
}) => (
  <button
    type="button"
    className={cx(style.button, className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));

Button.defaultProps = {
  className: '',
  children: '',
  onClick: null,
};

Button.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  onClick: PropTypes.func,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './style.scss';

const Button = ({
  type,
  className,
  children,
  onClick,
  ...props
}) => (
  <button // eslint-disable-line react/button-has-type
    type={type}
    className={cx(style.button, className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

Button.defaultProps = {
  type: 'button',
  className: '',
  children: '',
  onClick: null,
};

Button.propTypes = {
  type: PropTypes.string,
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

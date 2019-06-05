/* eslint jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './style.scss';

const Mask = memo(({
  className,
  children,
  onClick,
}) => (
  <div
    className={cx(
      style.modal,
      style['modal--active'],
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
));

Mask.defaultProps = {
  className: '',
  onClick: null,
};

Mask.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Mask;

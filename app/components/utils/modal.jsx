import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from 'styles/utils/modal.scss';

const Modal = (props) => {
  const {
    dialog,
    message,
    close,
  } = props;

  const arr = [...new Array(12).keys()].map(d => ({
    id: d + 1,
  }));

  const dialogClassName = cx(
    style.modal__dialog,
    style['modal__dialog--active'],
    style[`modal__dialog--${dialog}`],
  );

  return (
    <div // eslint-disable-line
      className={cx(style.modal, style['modal--mask'], style['modal--active'])}
      onClick={close}
    >
      <div // eslint-disable-line
        className={dialogClassName}
        onClick={(e) => { e.stopPropagation(); }}
      >
        {
          dialog === 'loading' && (
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
          )
        }

        {
          dialog === 'message' && (
            <p className={style.message}>
              {message}
            </p>
          )
        }
      </div>
    </div>
  );
};

Modal.defaultProps = {
  dialog: 'loading',
  message: '',
  close: null,
};

Modal.propTypes = {
  dialog: PropTypes.string,
  message: PropTypes.string,
  // methods
  close: PropTypes.func,
};

export default Modal;

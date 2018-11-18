import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Loading from 'components/utils/loading';

import style from 'styles/utils/modal.scss';

const Modal = (props) => {
  const {
    dialog,
    message,
    close,
  } = props;

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
            <Loading />
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

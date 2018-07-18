import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/page.scss';

const Bar = (props) => {
  const {
    match: {
      path,
    },
    title,
    countdown,
    setModal,
  } = props;

  return (
    <div className={style.page}>
      <p className={style.text}>
        {`${title}: ${path}, ${countdown}`}
      </p>
      <button
        type="button"
        className={style.btn}
        onClick={() => { setModal('点击mask关闭'); }}
      >
        {'Message'}
      </button>
    </div>
  );
};

Bar.propTypes = {
  countdown: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  // ownProps
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default Bar;

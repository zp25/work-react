import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/page.scss';

const Page = (props) => {
  const {
    match: {
      params: { page },
    },
    title,
    countdown,
    setModal,
  } = props;

  return (
    <div className={style.page}>
      <p className={style.text}>
        {`${title}: ${page}, ${countdown}`}
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

Page.propTypes = {
  countdown: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

export default Page;

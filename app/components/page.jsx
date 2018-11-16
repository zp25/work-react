import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'components/utils/helmet';

import style from 'styles/page.scss';

const Page = (props) => {
  const {
    match: {
      params: { page },
    },
    env,
    countdown,
    setModal,
  } = props;

  return (
    <div className={style.page}>
      <Helmet>
        <title>{page}</title>
      </Helmet>

      <p className={style.text}>
        {`${env}: ${page}, ${countdown}`}
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
  env: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

export default Page;

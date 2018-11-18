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
    asyncTask,
    countdown,
    loading,
    error,
    data,
    asyncStart,
    getData,
    setModal,
  } = props;

  let hint = '';

  if (loading) {
    hint = 'loading';
  } else if (error) {
    const { message } = data;

    hint = message;
  } else if (data) {
    const { foo, bar } = data;

    hint = `${foo}, ${bar}`;
  }

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
        {'Modal'}
      </button>

      <button
        type="button"
        className={style.btn}
        onClick={() => { getData(); }}
      >
        {'Fetch Data'}
      </button>

      <p>{hint}</p>

      <button
        type="button"
        className={style.btn}
        onClick={() => { asyncStart(); }}
      >
        {'Async'}
      </button>

      <p>{ asyncTask ? 1 : 0 }</p>
    </div>
  );
};

Page.defaultProps = {
  data: null,
};

Page.propTypes = {
  asyncTask: PropTypes.bool.isRequired,
  countdown: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Error),
  ]),
  env: PropTypes.string.isRequired,
  asyncStart: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

export default Page;

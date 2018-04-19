import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import style from 'styles/content.scss';

const Page = (props, context) => {
  const {
    title,
    countdown,
    setModal,
  } = props;
  const {
    location: {
      pathname,
    },
  } = context.router.history;

  return (
    <Fragment>
      <p className={style.text}>{`${title}: ${pathname}, ${countdown}`}</p>
      <button
        type="button"
        className={style.btn}
        onClick={() => { setModal('点击mask关闭'); }}
      >
        Message
      </button>
    </Fragment>
  );
};

Page.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object,
  }),
};

Page.propTypes = {
  countdown: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Page;

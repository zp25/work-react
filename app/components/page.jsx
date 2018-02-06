import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/content.scss';

const Page = (props, context) => {
  const { title, countdown } = props;
  const {
    location: {
      pathname,
    },
  } = context.router.history;

  return (
    <p className={style.text}>{`${title}: ${pathname}, ${countdown}`}</p>
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
};

export default Page;

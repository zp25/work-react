import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/content.scss';

const Page = (props) => {
  const { title, page, countdown } = props;

  return (
    <p className={style.text}>{`${title}: ${page}, ${countdown}`}</p>
  );
};

Page.propTypes = {
  page: PropTypes.string.isRequired,
  countdown: PropTypes.number.isRequired,
  // HOC
  title: PropTypes.string.isRequired,
};

export default Page;

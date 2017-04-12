import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/content.scss';

const Home = (props) => {
  const { title, countdown } = props;

  return (
    <p className={style.text}>{`${title}: ${countdown}`}</p>
  );
};

Home.propTypes = {
  countdown: PropTypes.number.isRequired,
  // HOC
  title: PropTypes.string.isRequired,
};

export default Home;

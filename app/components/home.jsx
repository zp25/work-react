import React from 'react';

import style from 'styles/content.scss';

const Home = (props) => {
  const { title, countdown } = props;

  return (
    <p className={style.text}>{`${title}: ${countdown}`}</p>
  );
};

Home.propTypes = {
  countdown: React.PropTypes.number.isRequired,
  // HOC
  title: React.PropTypes.string.isRequired,
};

export default Home;

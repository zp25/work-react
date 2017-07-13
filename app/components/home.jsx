import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from 'styles/content.scss';

const Home = (props) => {
  const { title, countdown } = props;
  const className = cx(style.text, 'ellipsis');

  return (
    <p className={className}>{`${title}: ${countdown}`}</p>
  );
};

Home.propTypes = {
  countdown: PropTypes.number.isRequired,
  // HOC
  title: PropTypes.string.isRequired,
};

export default Home;

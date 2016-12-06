import React from 'react';

import style from 'styles/bar.scss';

const Bar = (props) => {
  const { title, countdown } = props;

  return (
    <div className={style.bar}>{`${title}: Bar, ${countdown}`}</div>
  );
};

Bar.propTypes = {
  countdown: React.PropTypes.number.isRequired,
  // HOC
  title: React.PropTypes.string.isRequired,
};

export default Bar;

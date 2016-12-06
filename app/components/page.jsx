import React from 'react';

import style from 'styles/content.scss';

const Page = (props) => {
  const { title, location, countdown } = props;
  const text = location.pathname.slice(1);

  return (
    <p className={style.text}>{`${title}: ${text}, ${countdown}`}</p>
  );
};

Page.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  countdown: React.PropTypes.number.isRequired,
  // HOC
  title: React.PropTypes.string.isRequired,
};

export default Page;

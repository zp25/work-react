import React from 'react';

import style from 'styles/content.scss';

const Page = (props) => {
  const { title, page, countdown } = props;

  return (
    <p className={style.text}>{`${title}: ${page}, ${countdown}`}</p>
  );
};

Page.propTypes = {
  page: React.PropTypes.string.isRequired,
  countdown: React.PropTypes.number.isRequired,
  // HOC
  title: React.PropTypes.string.isRequired,
};

export default Page;

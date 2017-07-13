import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from 'styles/content.scss';

const Page = (props) => {
  const { title, page, countdown } = props;
  const className = cx(style.text, 'ellipsis');

  return (
    <p className={className}>{`${title}: ${page}, ${countdown}`}</p>
  );
};

Page.propTypes = {
  page: PropTypes.string.isRequired,
  countdown: PropTypes.number.isRequired,
  // HOC
  title: PropTypes.string.isRequired,
};

export default Page;

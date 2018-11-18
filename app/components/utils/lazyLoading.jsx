import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/utils/loading';

const LazyLoading = ({
  error,
  pastDelay,
  timedOut,
}) => {
  if (error) {
    return (
      <div>Loading Error</div>
    );
  }

  if (pastDelay) {
    return (
      <Loading />
    );
  }

  if (timedOut) {
    return (
      <div>Loading Timeout</div>
    );
  }

  return null;
};

LazyLoading.defaultProps = {
  error: null,
  pastDelay: false,
  timedOut: false,
};

LazyLoading.propTypes = {
  error: PropTypes.instanceOf(Error),
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool,
};

export default LazyLoading;

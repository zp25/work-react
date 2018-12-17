import React from 'react';
import PropTypes from 'prop-types';

const ErrorLoadPicture = ({
  children,
}) => (
  <p>{children}</p>
);

ErrorLoadPicture.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

export default ErrorLoadPicture;

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet as RootHelmet } from 'react-helmet';

const Helmet = ({ children }) => (
  <RootHelmet
    defaultTitle="Template"
    titleTemplate="Template - %s"
  >
    {children}
  </RootHelmet>
);

Helmet.defaultProps = {
  children: null,
};

Helmet.propTypes = {
  children: PropTypes.element,
};

export default Helmet;

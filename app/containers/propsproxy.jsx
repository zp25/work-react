import React from 'react';

export default WrappedComponent => (props) => {
  const hocprops = {
    title: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  };

  return <WrappedComponent {...props} {...hocprops} />;
};

import React from 'react';

const Bar = props => (
  <div className="bar">{`${props.title}: Bar`}</div>
);

Bar.propTypes = {
  title: React.PropTypes.string,
};

export default Bar;

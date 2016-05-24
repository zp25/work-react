import React from 'react';

const Bar = props => (
  <div className="bar">{`${props.title}: Bar, ${props.countdown}`}</div>
);

Bar.propTypes = {
  title: React.PropTypes.string.isRequired,
  countdown: React.PropTypes.number.isRequired,
};

export default Bar;

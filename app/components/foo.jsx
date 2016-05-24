import React from 'react';

const Foo = props => (
  <div className="foo">{`${props.title}: Foo, ${props.countdown}`}</div>
);

Foo.propTypes = {
  title: React.PropTypes.string.isRequired,
  countdown: React.PropTypes.number.isRequired,
};

export default Foo;

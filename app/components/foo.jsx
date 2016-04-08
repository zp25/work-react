import React from 'react';

const Foo = props => (
  <div className="foo">{`${props.title}: Foo`}</div>
);

Foo.propTypes = {
  title: React.PropTypes.string,
};

export default Foo;

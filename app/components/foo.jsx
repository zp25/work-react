import React from 'react';

/**
 * Foo模块
 * @param {Object} props 属性
 * @return {Object} 模块
 */
function Foo(props) {
  return (
    <div className="foo">{`${props.title}: Foo`}</div>
  );
}

Foo.propTypes = {
  title: React.PropTypes.string
};

export default Foo;

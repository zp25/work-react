import React from 'react';

/**
 * FOO模块
 * @param {Object} props 属性
 * @return {Object} 模块
 */
function FOO(props) {
  return (
    <div className="foo">{props.children}</div>
  );
}

FOO.propTypes = {
  children: React.PropTypes.string
};

export default FOO;

import React from 'react';

/**
 * Bar模块
 * @param {Object} props 属性
 * @return {Object} 模块
 */
function Bar(props) {
  return (
    <div className="bar">{`${props.title}: Bar`}</div>
  );
}

Bar.propTypes = {
  title: React.PropTypes.string
};

export default Bar;

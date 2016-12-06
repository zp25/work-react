import React from 'react';

import style from 'styles/foo.scss';

const Foo = (props) => {
  const { title, countdown } = props;

  return (
    <div className={style.foo}>{`${title}: Foo, ${countdown}`}</div>
  );
};

Foo.propTypes = {
  countdown: React.PropTypes.number.isRequired,
  // HOC
  title: React.PropTypes.string.isRequired,
};

export default Foo;

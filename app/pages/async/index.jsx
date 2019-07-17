import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'components/helmet';
import Button from 'components/button';

import style from './style.scss';

class Async extends Component {
  componentWillUnmount() {
    const { clearData } = this.props;

    clearData();
  }

  render() {
    const {
      hint,
      reqData,
    } = this.props;

    return (
      <div className={style.async}>
        <Helmet>
          <title>异步</title>
        </Helmet>

        <Button
          type="button"
          onClick={() => {
            reqData({ foo: 'Foo', bar: 'Bar' });
          }}
        >
          {'Fetch Data'}
        </Button>

        <p className={style.text}>{hint}</p>
      </div>
    );
  }
}

Async.propTypes = {
  hint: PropTypes.string.isRequired,
  reqData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
};

export default Async;

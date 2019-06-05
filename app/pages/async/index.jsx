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
      env,
      asyncTask,
      loading,
      error,
      data,
      asyncStart,
      reqData,
    } = this.props;

    let hint = '';

    if (loading) {
      hint = 'loading';
    } else if (error) {
      const { message } = data;

      hint = message;
    } else if (data) {
      const { foo, bar } = data;

      hint = `${foo}, ${bar}`;
    }

    return (
      <div className={style.async}>
        <Helmet>
          <title>异步</title>
        </Helmet>

        <p className={style.text}>{env}</p>

        <Button
          type="button"
          onClick={() => {
            reqData({ foo: 'Foo', bar: 'Bar' });
          }}
        >
          {'Fetch Data'}
        </Button>

        <p className={style.text}>{hint}</p>

        <Button
          type="button"
          onClick={asyncStart}
        >
          {'Async'}
        </Button>

        <p className={style.text}>{ asyncTask ? 1 : 0 }</p>
      </div>
    );
  }
}

Async.defaultProps = {
  data: null,
};

Async.propTypes = {
  env: PropTypes.string.isRequired,
  asyncTask: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Error),
  ]),
  asyncStart: PropTypes.func.isRequired,
  reqData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
};

export default Async;

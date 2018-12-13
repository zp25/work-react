import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'components/utils/helmet';
import Button from 'components/utils/button';

import style from './style.scss';

class Page extends Component {
  componentWillUnmount() {
    const { clearData } = this.props;

    clearData();
  }

  render() {
    const {
      match: {
        params: { page },
      },
      env,
      asyncTask,
      loading,
      error,
      data,
      asyncStart,
      getData,
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
      <div className={style.page}>
        <Helmet>
          <title>{page}</title>
        </Helmet>

        <p className={style.text}>
          {`${env}: ${page}`}
        </p>

        <Button
          type="button"
          onClick={getData}
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

Page.defaultProps = {
  data: null,
};

Page.propTypes = {
  asyncTask: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Error),
  ]),
  env: PropTypes.string.isRequired,
  asyncStart: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  // ownProps
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

export default Page;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import cx from 'classnames';
import Home from 'containers/home';
import Page from 'containers/page';
import Picture from 'components/picture';
import Portal from 'components/portal';
import Modal from 'components/utils/modal';

import style from 'styles/app.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.intervals = NaN;
  }

  componentDidMount() {
    // 开始倒计时
    this.startContdown();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setInterval(...args) {
    this.intervals = setInterval(...args);
  }

  clearInterval() {
    if (this.intervals) {
      clearInterval(this.intervals);
      this.intervals = NaN;
    }

    this.props.setCountdown(0);
  }

  startContdown(second = 10) {
    this.props.setCountdown(second);

    this.setInterval(() => {
      if (this.props.countdown <= 1) {
        this.clearInterval();
      } else {
        this.props.decrement();
      }
    }, 1000);
  }

  /**
   * 判断给定page是否为当前显示页面
   * @param {string} page - 页面名称
   * @return {Boolean}
   */
  isActive(page) {
    const { pathname } = this.props.location;

    return pathname.slice(1).toLowerCase() === page;
  }

  render() {
    const {
      history,
      modal,
      closeModal,
    } = this.props;

    const routes = [
      {
        id: 1,
        path: '/foo',
        exact: true,
        strict: true,
        main: () => <Page />,
      },
      {
        id: 2,
        path: '/bar',
        exact: true,
        strict: true,
        main: () => <Page />,
      },
    ];

    return (
      <Router history={history}>
        <div className={style.app}>
          <ul className={cx(style.nav, style.container)}>
            <li>
              <Link to="/foo" className={cx({ [style.active]: this.isActive('foo') })}>Foo</Link>
            </li>
            <li>
              <Link to="/bar" className={cx({ [style.active]: this.isActive('bar') })}>Bar</Link>
            </li>
          </ul>

          <div className={cx(style.content, style.container)}>
            <Switch>
              {
                routes.map((route) => {
                  const {
                    id,
                    main,
                    ...rest
                  } = route;

                  return (
                    <Route
                      key={id}
                      render={main}
                      {...rest}
                    />
                  );
                })
              }
              <Route component={Home} />
            </Switch>
          </div>

          <Picture />

          {
            modal.active && (
              <Portal>
                <Modal
                  dialog={modal.dialog}
                  message={modal.message}
                  close={modal.dialog === 'loading' ? null : closeModal}
                />
              </Portal>
            )
          }
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  countdown: PropTypes.number.isRequired,
  modal: PropTypes.shape({
    active: PropTypes.bool,
    dialog: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  // methods
  setCountdown: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default App;

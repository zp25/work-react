import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import Picture from 'components/picture';
import Portal from 'components/portal';
import Routes from 'components/routes';
import Modal from 'components/utils/modal';

import 'styles/root.scss';
import 'normalize.css/normalize.css';
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

    const { setCountdown } = this.props;
    setCountdown(0);
  }

  startContdown(second = 10) {
    const {
      setCountdown,
      decrement,
    } = this.props;

    setCountdown(second);

    this.setInterval(() => {
      const { countdown } = this.props;

      if (countdown <= 1) {
        this.clearInterval();
      } else {
        decrement();
      }
    }, 1000);
  }

  render() {
    const {
      modal,
      closeModal,
    } = this.props;

    return (
      <div className={style.app}>
        <ul className={cx(style.nav, style.container)}>
          <li>
            <NavLink to="/foo" activeClassName={style.active} exact strict>
              {'Foo'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/bar" activeClassName={style.active} exact strict>
              {'Bar'}
            </NavLink>
          </li>
        </ul>

        <div className={cx(style.content, style.container)}>
          <Routes />
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
    );
  }
}

App.propTypes = {
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

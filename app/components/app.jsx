import React, { Component } from 'react';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';
// import Router from 'react-router/BrowserRouter';
import { Link, Match, Miss } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from 'containers/home';
import Page from 'containers/page';
import Picture from 'components/picture';

import style from 'styles/app.scss';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.intervals = 0;
    this.routerChange = this.routerChange.bind(this);
  }

  componentDidMount() {
    // 呈现后开始倒计时
    this.startContdown();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setInterval(...args) {
    this.intervals = setInterval(...args);
  }

  clearInterval() {
    clearInterval(this.intervals);
    this.props.setCountdown(0);
  }

  startContdown(second = 10) {
    this.props.setCountdown(second);

    this.setInterval(() => {
      if (this.props.countdown <= 1) {
        this.clearInterval();
      } else {
        this.props.doDecrement();
      }
    }, 1000);
  }

  /**
   * 处理路径变化
   */
  routerChange(location, action) {
    // you must always accept a `SYNC` action,
    // but only put the location in state
    if (action === 'SYNC') {
      this.props.setRouter(location, this.props.action);
    } else {
      this.props.setRouter(location, action);
    }
  }

  render() {
    const isActive = pathname => location => location.pathname.toLowerCase() === pathname;

    return (
      <Router
        history={history}
        location={this.props.location}
        action={this.props.action}
        onChange={this.routerChange}
      >
        <div className={style.app}>
          <ul className={style.nav}>
            <li>
              <Link to="/foo" activeClassName={style.active} isActive={isActive('/foo')}>Foo</Link>
            </li>
            <li>
              <Link to="/bar" activeClassName={style.active} isActive={isActive('/bar')}>Bar</Link>
            </li>
          </ul>

          <Match
            pattern="/"
            render={() => (
              <div className={style.content}>
                <Match exactly pattern="/foo" component={Page} />
                <Match exactly pattern="/bar" component={Page} />
                <Miss component={Home} />
              </div>
            )}
          />

          <Picture />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }).isRequired,
  action: React.PropTypes.string.isRequired,
  countdown: React.PropTypes.number.isRequired,
  setRouter: React.PropTypes.func.isRequired,
  setCountdown: React.PropTypes.func.isRequired,
  doDecrement: React.PropTypes.func.isRequired,
};

export default App;

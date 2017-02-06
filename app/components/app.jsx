import React, { Component } from 'react';
import { Router, Link, Route, Switch } from 'react-router-dom';
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

  componentWillMount() {
    this.initRouter();
  }

  componentDidMount() {
    // 监听history变化
    this.unlisten = history.listen(this.routerChange);

    // 开始倒计时
    this.startContdown();
  }

  componentWillUnmount() {
    this.unlisten();

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
   * 初始化router
   */
  initRouter() {
    this.routerChange(history.location, history.action);
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
    const isActive = page => this.props.location.pathname.slice(1).toLowerCase() === page;
    const renderPage = page => props => (
      <Page {...props} page={page} />
    );

    return (
      <Router history={history}>
        <div className={style.app}>
          <ul className={style.nav}>
            <li>
              <Link to="/foo" className={isActive('foo') && style.active}>Foo</Link>
            </li>
            <li>
              <Link to="/bar" className={isActive('bar') && style.active}>Bar</Link>
            </li>
          </ul>

          <div className={style.content}>
            <Switch>
              <Route exact strict path="/foo" render={renderPage('foo')} />
              <Route exact strict path="/bar" render={renderPage('bar')} />
              <Route component={Home} />
            </Switch>
          </div>

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

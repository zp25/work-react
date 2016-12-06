import React, { Component } from 'react';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';
// import Router from 'react-router/BrowserRouter';
import { Link, Match } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Foo from 'containers/foo';
import Bar from 'containers/bar';
import Picture from 'components/picture';

import style from 'styles/app.scss';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.intervals = 0;
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

  render() {
    return (
      <Router
        history={history}
        location={this.props.location}
        action={this.props.action}
        onChange={(location, action) => {
          // you must always accept a `SYNC` action,
          // but only put the location in state
          if (action === 'SYNC') {
            this.props.setRouter(location, this.props.action);
          } else {
            this.props.setRouter(location, action);
          }
        }}
      >
        <div className={style.app}>
          <ul className={style.nav}>
            <li><Link to="/" activeOnlyWhenExact activeClassName={style.active}>Foo</Link></li>
            <li><Link to="/bar" activeClassName={style.active}>Bar</Link></li>
          </ul>

          <Match pattern="/" exactly component={Foo} />
          <Match pattern="/bar" component={Bar} />

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

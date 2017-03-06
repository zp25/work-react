import React, { Component } from 'react';
import { Router, Link, Route, Switch } from 'react-router-dom';
import Home from 'containers/home';
import Page from 'containers/page';
import Picture from 'components/picture';

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
        this.props.doDecrement();
      }
    }, 1000);
  }

  render() {
    const isActive = page => this.props.location.pathname.slice(1).toLowerCase() === page;
    const renderPage = page => props => (
      <Page {...props} page={page} />
    );

    return (
      <Router history={this.props.history}>
        <div className={style.app}>
          <ul className={style.nav}>
            <li>
              <Link to="/foo" className={isActive('foo') ? style.active : ''}>Foo</Link>
            </li>
            <li>
              <Link to="/bar" className={isActive('bar') ? style.active : ''}>Bar</Link>
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
  history: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }).isRequired,
  countdown: React.PropTypes.number.isRequired,
  setCountdown: React.PropTypes.func.isRequired,
  doDecrement: React.PropTypes.func.isRequired,
};

export default App;

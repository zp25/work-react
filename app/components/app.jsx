import React from 'react';
import { Link } from 'react-router';

import '../styles/styles';
import z from '../styles/app';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.intervals = 0;
    this.seconds = 3;
  }

  componentWillMount() {
    // 呈现前修改开发状态
    this.props.setDev(__DEV__);
  }

  componentDidMount() {
    // 呈现后开始倒计时
    this.startContdown(this.seconds);
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

  startContdown(seconds = 60) {
    this.props.setCountdown(seconds);

    this.setInterval(() => {
      if (this.props.countdown <= 0) {
        this.clearInterval();
      } else {
        this.props.doDecrement();
      }
    }, 1000);
  }

  render() {
    return (
      <div
        className={`${z.app} ${this.props.dev ? z['app--dev'] : z['app--pro']}`}
      >
        <ul>
          <li>
            <Link to="/" activeClassName={z.active} onlyActiveOnIndex>Foo</Link>
          </li>
          <li>
            <Link to="/bar" activeClassName={z.active}>Bar</Link>
          </li>
        </ul>
        {
          React.cloneElement(this.props.children, {
            title: (this.props.dev ? 'dev' : 'pro'),
          })
        }
      </div>
    );
  }
}

App.propTypes = {
  dev: React.PropTypes.bool.isRequired,
  countdown: React.PropTypes.number.isRequired,
  setDev: React.PropTypes.func.isRequired,
  setCountdown: React.PropTypes.func.isRequired,
  doDecrement: React.PropTypes.func.isRequired,
  children: React.PropTypes.element,
};

export default App;

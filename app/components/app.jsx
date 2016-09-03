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
        className={`${z.app} ${__DEV__ ? z['app--dev'] : z['app--pro']}`}
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
            title: (__DEV__ ? 'dev' : 'pro'),
          })
        }
      </div>
    );
  }
}

App.propTypes = {
  countdown: React.PropTypes.number.isRequired,
  setCountdown: React.PropTypes.func.isRequired,
  doDecrement: React.PropTypes.func.isRequired,
  children: React.PropTypes.element,
};

export default App;

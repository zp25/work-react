import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/app';

const title = __DEV__ ? 'dev' : 'pro';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title,
    };
  }

  render() {
    return (
      <div className={styles.app}>
        <ul>
          <li>
            <Link to="/" activeClassName={styles.active} onlyActiveOnIndex>Foo</Link>
          </li>
          <li><Link to="/bar" activeClassName={styles.active}>Bar</Link></li>
        </ul>
        {React.cloneElement(this.props.children, { title: this.state.title })}
      </div>
    );
  }
}

Home.propTypes = {
  children: React.PropTypes.element,
};

export default Home;

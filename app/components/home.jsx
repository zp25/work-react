import React from 'react';
import {Link} from 'react-router';

const title = __DEV__ ? 'dev' : 'pro';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title
    };
  }

  render() {
    return (
      <div className="app">
        <ul>
          <li>
            <Link to="/" activeClassName="active" onlyActiveOnIndex>Foo</Link>
          </li>
          <li><Link to="/bar" activeClassName="active">Bar</Link></li>
        </ul>
        {React.cloneElement(this.props.children, {title: this.state.title})}
      </div>
    );
  }
}

Home.propTypes = {
  children: React.PropTypes.element
};

export default Home;

import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends PureComponent {
  constructor(props) {
    super(props);

    this.root = document.querySelector('body');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

Portal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Portal;

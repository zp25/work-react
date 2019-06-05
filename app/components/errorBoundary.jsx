import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends PureComponent {
  componentDidCatch(err, { componentStack }) {
    const {
      onError,
      logComponentStack,
    } = this.props;

    onError(err);
    logComponentStack(componentStack);
  }

  render() {
    const {
      children,
      error,
      render,
    } = this.props;

    if (error instanceof Error) {
      return render(error);
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  error: null,
  logComponentStack: console.log, // eslint-disable-line no-console
};

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  error: PropTypes.instanceOf(Error),
  render: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  logComponentStack: PropTypes.func,
};

export default ErrorBoundary;

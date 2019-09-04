import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '@/pages/app';
import {
  clearModal,
} from '@/actions';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(clearModal()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  }
);

const AppContainer = connect(
  null,
  mapDispatchToProps,
  mergeProps,
)(App);

export default withRouter(AppContainer);

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from 'pages/app';
import {
  clearModal,
} from 'actions';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(clearModal()),
});

const AppContainer = connect(
  null,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);

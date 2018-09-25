import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from 'components/app';
import {
  setCountdown,
  decrement,
  clearModal,
} from 'actions';

const mapStateToProps = state => ({
  countdown: state.countdown,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  setCountdown: second => dispatch(setCountdown(second)),
  decrement: () => dispatch(decrement()),
  closeModal: () => dispatch(clearModal()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);

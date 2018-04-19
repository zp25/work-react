import { connect } from 'react-redux';
import App from 'components/app';
import {
  setCountdown,
  decrement,
  clearModal,
} from 'actions';

const mapStateToProps = state => ({
  location: state.router.location,
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

export default AppContainer;

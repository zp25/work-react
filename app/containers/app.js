import { connect } from 'react-redux';
import App from 'components/app';
import { setCountdown, decrement } from 'actions';

const mapStateToProps = state => ({
  location: state.router.location,
  countdown: state.countdown,
});

const mapDispatchToProps = dispatch => ({
  setCountdown: second => dispatch(setCountdown(second)),
  decrement: () => dispatch(decrement()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;

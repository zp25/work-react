import { connect } from 'react-redux';
import { setCountdown, doDecrement } from '../actions';
import App from '../components/app';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const mapDispatchToProps = dispatch => ({
  setCountdown: second => dispatch(setCountdown(second)),
  doDecrement: () => dispatch(doDecrement()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

import { connect } from 'react-redux';
import { setDev, setCountdown, doDecrement } from '../actions';
import App from '../components/app';

const mapStateToProps = store => ({
  dev: store.dev,
  countdown: store.countdown,
});

const mapDispatchToProps = dispatch => ({
  setDev: isDev => dispatch(setDev(isDev)),
  setCountdown: second => dispatch(setCountdown(second)),
  doDecrement: () => dispatch(doDecrement()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

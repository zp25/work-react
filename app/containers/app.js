import { connect } from 'react-redux';
import App from 'components/app';
import { setCountdown, doDecrement } from 'actions';

const mapStateToProps = store => ({
  location: store.router.location,
  countdown: store.countdown,
});

const mapDispatchToProps = dispatch => ({
  setCountdown: second => dispatch(setCountdown(second)),
  doDecrement: () => dispatch(doDecrement()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;

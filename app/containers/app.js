import { connect } from 'react-redux';
import App from 'components/app';
import { setRouter, setCountdown, doDecrement } from 'actions';

const mapStateToProps = store => ({
  location: store.router.location,
  action: store.router.action,
  countdown: store.countdown,
});

const mapDispatchToProps = dispatch => ({
  setRouter: (location, action) => dispatch(setRouter({ location, action })),
  setCountdown: second => dispatch(setCountdown(second)),
  doDecrement: () => dispatch(doDecrement()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;

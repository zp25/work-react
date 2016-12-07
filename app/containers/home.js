import { connect } from 'react-redux';
import Home from 'components/home';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    title: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const HomeContainer = connect(
  mapStateToProps,
  null,
  mergeProps,
)(Home);

export default HomeContainer;

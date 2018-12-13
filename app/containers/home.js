import { connect } from 'react-redux';
import Home from 'components/home';
import { setModal } from 'actions';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(setModal(true)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const HomeContainer = connect(
  null,
  mapDispatchToProps,
  mergeProps,
)(Home);

export default HomeContainer;

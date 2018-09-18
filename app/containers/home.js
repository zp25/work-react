import { connect } from 'react-redux';
import Home from 'components/home';
import { setModal, clearModal } from 'actions';

const mapStateToProps = state => ({
  countdown: state.countdown,
});

const mapDispatchToProps = dispatch => ({
  setModal: () => dispatch(setModal({
    active: true,
    dialog: 'loading',
    message: '',
  })),
  closeModal: () => dispatch(clearModal()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    title: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Home);

export default HomeContainer;

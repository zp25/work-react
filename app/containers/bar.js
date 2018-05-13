import { connect } from 'react-redux';
import Bar from 'components/bar';
import { setModal } from 'actions';

const mapStateToProps = state => ({
  countdown: state.countdown,
});

const mapDispatchToProps = dispatch => ({
  setModal: message => dispatch(setModal({
    active: true,
    dialog: 'message',
    message: message.toString(),
  })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    title: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const BarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Bar);

export default BarContainer;

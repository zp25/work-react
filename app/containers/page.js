import { connect } from 'react-redux';
import Page from 'components/page';
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
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Page);

export default PageContainer;

import { connect } from 'react-redux';
import Page from 'components/page';
import {
  asyncStart,
  getData,
  setModal,
} from 'actions';

const mapStateToProps = ({
  asyncTask,
  countdown,
  data: {
    loading,
    error,
    data,
  },
}) => ({
  asyncTask,
  loading,
  error,
  data,
  countdown,
});

const mapDispatchToProps = dispatch => ({
  asyncStart: () => dispatch(asyncStart()),
  getData: () => dispatch(getData()),
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

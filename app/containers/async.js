import { connect } from 'react-redux';
import Async from 'pages/async';
import {
  asyncStart,
  reqData,
  clearData,
} from 'actions';

const mapStateToProps = ({
  asyncTask,
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
});

const mapDispatchToProps = dispatch => ({
  asyncStart: () => dispatch(asyncStart()),
  reqData: data => dispatch(reqData(data)),
  clearData: () => dispatch(clearData()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const AsyncContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Async);

export default AsyncContainer;

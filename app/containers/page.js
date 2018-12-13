import { connect } from 'react-redux';
import Page from 'components/page';
import {
  asyncStart,
  clearData,
  getData,
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
  clearData: () => dispatch(clearData()),
  getData: () => dispatch(getData()),
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

import { connect } from 'react-redux';
import Page from 'components/page';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    title: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  })
);

const PageContainer = connect(
  mapStateToProps,
  null,
  mergeProps,
)(Page);

export default PageContainer;

import { connect } from 'react-redux';
import propsproxy from 'containers/propsproxy';
import Page from 'components/page';

const mapStateToProps = store => ({
  location: store.router.location,
  countdown: store.countdown,
});

const PageContainer = connect(
  mapStateToProps,
)(propsproxy(Page));

export default PageContainer;

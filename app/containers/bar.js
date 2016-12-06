import { connect } from 'react-redux';
import propsproxy from 'containers/propsproxy';
import Bar from 'components/bar';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const BarContainer = connect(
  mapStateToProps,
)(propsproxy(Bar));

export default BarContainer;

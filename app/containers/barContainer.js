import { connect } from 'react-redux';
import Bar from '../components/bar';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const BarContainer = connect(
  mapStateToProps
)(Bar);

export default BarContainer;

import { connect } from 'react-redux';
import propsproxy from 'containers/propsproxy';
import Home from 'components/home';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const HomeContainer = connect(
  mapStateToProps,
)(propsproxy(Home));

export default HomeContainer;

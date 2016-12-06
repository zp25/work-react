import { connect } from 'react-redux';
import propsproxy from 'containers/propsproxy';
import Foo from 'components/foo';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const FooContainer = connect(
  mapStateToProps,
)(propsproxy(Foo));

export default FooContainer;

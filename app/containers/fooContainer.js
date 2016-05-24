import { connect } from 'react-redux';
import Foo from '../components/foo';

const mapStateToProps = store => ({
  countdown: store.countdown,
});

const FooContainer = connect(
  mapStateToProps
)(Foo);

export default FooContainer;

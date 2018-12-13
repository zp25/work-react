import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from 'components/app';
import { clearModal } from 'actions';

const mapStateToProps = ({
  modal,
}) => ({
  modal,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(clearModal()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from 'components/app';
import {
  setErrorLoadPicture,
  clearModal,
} from 'actions';

const mapStateToProps = ({
  errorLoadPicture,
  modal,
}) => ({
  errorLoadPicture,
  modal,
});

const mapDispatchToProps = dispatch => ({
  setErrorLoadPicture: err => dispatch(setErrorLoadPicture(err)),
  closeModal: () => dispatch(clearModal()),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default withRouter(AppContainer);

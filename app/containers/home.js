import { connect } from 'react-redux';
import Home from 'pages/home';
import {
  setErrorLoadPicture,
  setModal,
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
  openModal: () => dispatch(setModal(true)),
  closeModal: () => dispatch(clearModal()),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;

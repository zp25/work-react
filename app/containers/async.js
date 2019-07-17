import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Async from 'pages/async';
import {
  reqData,
  clearData,
} from 'actions';

const hintSelector = createSelector(
  state => state.data,
  ({
    loading,
    error,
    data,
  }) => {
    if (loading) {
      return 'loading';
    }

    if (error) {
      const { message } = data;

      return message;
    }

    if (typeof data === 'object') {
      return Object.values(data).join(', ');
    }

    return data.toString();
  },
);

const mapStateToProps = state => ({
  hint: hintSelector(state),
});

const mapDispatchToProps = dispatch => ({
  reqData: data => dispatch(reqData(data)),
  clearData: () => dispatch(clearData()),
});

const AsyncContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Async);

export default AsyncContainer;

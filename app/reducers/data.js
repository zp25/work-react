import createReducer from 'zp-lib/src/createReducer';
import {
  reqData,
  resData,
  errData,
  clearData,
} from 'actions/data';

const initState = {
  loading: false,
  error: false,
  data: null,
};

export default createReducer(initState, {
  [reqData]: (state, { payload }) => ({
    loading: true,
    error: false,
    data: payload,
  }),
  [resData]: (state, { payload }) => ({
    loading: false,
    error: false,
    data: payload,
  }),
  [errData]: (state, { payload }) => ({
    loading: false,
    error: true,
    data: payload,
  }),
  [clearData]: () => Object.assign({}, initState),
});

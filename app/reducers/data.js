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
  data: '',
};

export default createReducer(initState, {
  [reqData]: () => ({
    loading: true,
    error: false,
    data: '',
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
  [clearData]: () => ({ ...initState }),
});

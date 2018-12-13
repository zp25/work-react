import { createReducer } from 'zp-lib/index';
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
  [reqData]: () => Object.assign({}, initState, { loading: true }),
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

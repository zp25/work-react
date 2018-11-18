import { createReducer } from 'zp-lib/index';
import {
  REQ_DATA,
  RES_DATA,
  ERR_DATA,
} from 'constants/actionTypes';

const initState = {
  loading: false,
  error: false,
  data: null,
};

export default createReducer(initState, {
  [REQ_DATA]: () => Object.assign({}, initState, { loading: true }),
  [RES_DATA]: (state, { payload }) => ({
    loading: false,
    error: false,
    data: payload,
  }),
  [ERR_DATA]: (state, { payload }) => ({
    loading: false,
    error: true,
    data: payload,
  }),
});

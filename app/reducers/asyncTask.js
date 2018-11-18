import { createReducer } from 'zp-lib/index';
import { ASYNC_START, ASYNC_DONE } from 'constants/actionTypes';

const initState = false;

export default createReducer(initState, {
  [ASYNC_START]: () => true,
  [ASYNC_DONE]: () => false,
});

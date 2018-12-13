import { createReducer } from 'zp-lib/index';
import {
  asyncStart,
  asyncDone,
} from 'actions/asyncTask';

const initState = false;

export default createReducer(initState, {
  [asyncStart]: () => true,
  [asyncDone]: () => false,
});

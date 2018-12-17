import { createReducer } from 'zp-lib/index';
import {
  setErrorLoadPicture,
  clearErrorLoadPicture,
} from 'actions/errorLoadPicture';

const initState = null;

export default createReducer(initState, {
  [setErrorLoadPicture]: (state, { payload }) => payload || state,
  [clearErrorLoadPicture]: () => initState,
});

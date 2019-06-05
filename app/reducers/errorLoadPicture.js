import createReducer from 'zp-lib/src/createReducer';
import {
  setErrorLoadPicture,
  clearErrorLoadPicture,
} from 'actions/errorLoadPicture';

const initState = null;

export default createReducer(initState, {
  [setErrorLoadPicture]: (state, { payload }) => payload || state,
  [clearErrorLoadPicture]: () => initState,
});

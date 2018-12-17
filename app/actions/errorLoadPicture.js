import { createAction } from 'zp-lib/index';

/* ****** Types ****** */
const SET_ERROR_LOADPICTURE = 'SET_ERROR_LOADPICTURE';
const CLEAR_ERROR_LOADPICTURE = 'CLEAR_ERROR_LOADPICTURE';

/* ** ActionCreators ** */
const setErrorLoadPicture = createAction(SET_ERROR_LOADPICTURE);
const clearErrorLoadPicture = createAction(CLEAR_ERROR_LOADPICTURE);

export {
  setErrorLoadPicture,
  clearErrorLoadPicture,
};

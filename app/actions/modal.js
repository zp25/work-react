import createAction from 'zp-lib/src/createAction';

/* ****** Types ****** */
const SET_MODAL = 'SET_MODAL';
const CLEAR_MODAL = 'CLEAR_MODAL';

/* ** ActionCreators ** */
const setModal = createAction(SET_MODAL);
const clearModal = createAction(CLEAR_MODAL);

export {
  setModal,
  clearModal,
};

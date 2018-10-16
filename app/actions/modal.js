import { createAction } from 'zp-lib/index';
import { SET_MODAL, CLEAR_MODAL } from 'constants/actionTypes';

const setModal = createAction(SET_MODAL);
const clearModal = createAction(CLEAR_MODAL);

export {
  setModal,
  clearModal,
};

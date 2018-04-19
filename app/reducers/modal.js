import { createReducer } from 'lib';
import { SET_MODAL, CLEAR_MODAL } from 'constants/actionTypes';

const initState = {
  active: false,
  dialog: 'loading',
  message: '',
};

export default createReducer(initState, {
  [SET_MODAL]: (state, action) => Object.assign({}, state, action.payload),
  [CLEAR_MODAL]: () => Object.assign({}, initState),
});

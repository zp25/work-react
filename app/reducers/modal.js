import { createReducer } from 'zp-lib/index';
import {
  setModal,
  clearModal,
} from '@/actions/modal';

const initState = false;

export default createReducer(initState, {
  [setModal]: (state, { payload }) => !!payload,
  [clearModal]: () => false,
});

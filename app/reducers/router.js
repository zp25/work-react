import { createReducer } from 'lib';
import { NAVIGATE } from 'constants/actionTypes';

const initState = {
  location: {
    pathname: '/',
    search: '',
    hash: '',
  },
  action: 'POP',
};

export default createReducer(initState, {
  [NAVIGATE]: (state, action) => action.payload || state,
});

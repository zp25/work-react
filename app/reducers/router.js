import createReducer from 'utils/createReducer';
import { NAVIGATE } from 'constants/actionTypes';

const initState = {
  location: {
    pathname: '/',
  },
  action: 'PUSH',
};

export default createReducer(initState, {
  [NAVIGATE]: (state, action) => action.payload || state,
});

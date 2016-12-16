import createReducer from 'utils/createReducer';
import { COUNTDOWN, DECREMENT } from 'constants/actionTypes';

const initState = 0;

export default createReducer(initState, {
  [COUNTDOWN]: (state, action) => Number(action.payload) || 0,
  [DECREMENT]: state => state - 1,
});
import { combineReducers } from 'redux';
import * as types from './actions';

/**
 * Reducer Factory
 * @param {*} initialState 默认值
 * @param {Object} handlers 处理函数映射表
 * @return {Function} Reducer
 */
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

// coundown reducer
const cdReducer = createReducer(60, {
  [types.COUNTDOWN]: (state, action) => action.payload || state,
  [types.DECREMENT]: state => state - 1,
});

// combine
const reducer = combineReducers({
  countdown: cdReducer,
});

export default reducer;

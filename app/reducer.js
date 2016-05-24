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
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

// coundown reducer
const devReducer = createReducer(true, {
  [types.DEVELOPMENT]: (state, action) => action.payload || state,
});

// coundown reducer
const cdReducer = createReducer(60, {
  [types.COUNTDOWN]: (state, action) => action.payload || state,
  [types.DECREMENT]: state => state - 1,
});

// combine
const reducer = combineReducers({
  dev: devReducer,
  countdown: cdReducer,
});

export default reducer;

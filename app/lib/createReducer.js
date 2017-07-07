/**
 * Reducer Factory
 * @param {*} initialState - state tree特定部分的默认值
 * @param {Object} handlers - 处理函数映射表
 * @return {function} Reducer
 */
export default (initialState, handlers) => (state = initialState, action) => {
  if ({}.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

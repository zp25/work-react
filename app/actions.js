export const DEVELOPMENT = 'DEVELOPMENT';
export const COUNTDOWN = 'COUNTDOWN';
export const DECREMENT = 'DECREMENT';

/**
 * FSA Factory
 * https://github.com/acdlite/redux-actions/blob/master/src/createAction.js
 * @param {String} type Action type
 * @param {Function} actionCreator payload创建函数
 * @param {Function} metaCreator meta数据创建函数
 * @return {Function} Action创建函数，此函数返回创建的Action
 */
function createAction(type, actionCreator, metaCreator) {
  const finalActionCreator = typeof actionCreator === 'function'
    ? actionCreator
    : t => t;

  const actionHandler = (...args) => {
    const action = {
      type,
    };

    const payload = finalActionCreator(...args);
    if (!(payload === null || payload === undefined)) {
      action.payload = payload;
    }

    if (action.payload instanceof Error) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true;
    }

    if (typeof metaCreator === 'function') {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionHandler.toString = () => type;

  return actionHandler;
}

// 是否开发环境
export const setDev = createAction(DEVELOPMENT);

// 设置倒计时
export const setCountdown = createAction(COUNTDOWN);

// 倒计时
export const doDecrement = createAction(DECREMENT);
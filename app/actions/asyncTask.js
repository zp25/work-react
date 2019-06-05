import createAction from 'zp-lib/src/createAction';

/* ****** Types ****** */
const ASYNC_START = 'ASYNC_START';
const ASYNC_DONE = 'ASYNC_DONE';

/* ** ActionCreators ** */
const asyncStart = createAction(ASYNC_START);
const asyncDone = createAction(ASYNC_DONE);

export {
  asyncStart,
  asyncDone,
};

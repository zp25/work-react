import { createAction } from 'zp-lib/index';
import { ASYNC_START, ASYNC_DONE } from 'constants/actionTypes';

export const asyncStart = createAction(ASYNC_START);

export const asyncDone = createAction(ASYNC_DONE);

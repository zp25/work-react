import createAction from 'utils/createAction';
import { COUNTDOWN, DECREMENT } from 'constants/actionTypes';

// 设置倒计时
export const setCountdown = createAction(COUNTDOWN);

// 倒计时
export const doDecrement = createAction(DECREMENT);

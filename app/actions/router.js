import { createAction } from 'lib';
import { NAVIGATE } from 'constants/actionTypes';

// 导航
const setRouter = createAction(NAVIGATE);

export default setRouter;

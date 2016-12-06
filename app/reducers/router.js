import createBrowserHistory from 'history/createBrowserHistory';
import createReducer from 'utils/createReducer';
import { NAVIGATE } from 'constants/actionTypes';

const history = createBrowserHistory();

const initState = {
  location: history.location,
  action: history.action,
};

export default createReducer(initState, {
  [NAVIGATE]: (state, action) => action.payload || state,
});

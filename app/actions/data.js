import { createAction, api } from 'zp-lib/index';
import {
  REQ_DATA,
  RES_DATA,
  ERR_DATA,
} from 'constants/actionTypes';
import { API_DATA } from 'constants/apis';

const reqData = createAction(REQ_DATA);
const resData = createAction(RES_DATA);
const errData = createAction(ERR_DATA);

const getData = () => (dispatch) => {
  dispatch(reqData());

  return api.get(API_DATA, { mode: 'cors' })
    .then((json) => {
      dispatch(resData(json));
    })
    .catch((err) => {
      dispatch(errData(err));
    });
};

export default getData;

import { createAction, api } from 'zp-lib/index';
import { API_DATA } from 'constants/apis';

/* ****** Types ****** */
const REQ_DATA = 'REQ_DATA';
const RES_DATA = 'RES_DATA';
const ERR_DATA = 'ERR_DATA';
const CLEAR_DATA = 'CLEAR_DATA';

/* ** ActionCreators ** */
const reqData = createAction(REQ_DATA);
const resData = createAction(RES_DATA);
const errData = createAction(ERR_DATA);

const clearData = createAction(CLEAR_DATA);

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

export {
  reqData,
  resData,
  errData,
  clearData,
  getData,
};

import createAction from 'zp-lib/src/createAction';

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

export {
  reqData,
  resData,
  errData,
  clearData,
};

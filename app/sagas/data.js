import {
  // call,
  delay,
  put,
  takeLeading,
} from 'redux-saga/effects';
// import api from 'zp-lib/src/api';
import {
  reqData,
  resData,
  errData,
} from 'actions/data';

// import { API_DATA } from '../apis';

function* fetchData(action) {
  const { payload } = action;

  try {
    // const result = yield call(api.post, API_DATA, {
    //   body: payload,
    //   mode: 'cors',
    // });

    yield delay(1000);

    yield put(resData(payload));
  } catch (err) {
    yield put(errData(err));
  }
}

export default function* data() {
  yield takeLeading(reqData.toString(), fetchData);
}

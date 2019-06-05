import {
  call,
  delay,
  put,
  takeLeading,
} from 'redux-saga/effects';
import api from 'zp-lib/src/api';
import {
  reqData,
  resData,
  errData,
} from 'actions/data';

import { API_DATA } from '../apis';

function* fetchData(action) {
  const { payload: body } = action;

  try {
    let result = {};

    if (process.env.MOCK) {
      result = yield delay(1000, body);
    } else {
      result = yield call(api.post, API_DATA, {
        body,
        mode: 'cors',
      });
    }

    yield put(resData(result));
  } catch (err) {
    yield put(errData(err));
  }
}

export default function* data() {
  yield takeLeading(reqData.toString(), fetchData);
}

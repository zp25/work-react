import {
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  asyncStart,
  asyncDone,
} from 'actions/asyncTask';

function* done() {
  yield delay(1000);
  yield put(asyncDone());
}

export default function* watchAsyncStart() {
  yield takeLatest(asyncStart.toString(), done);
}

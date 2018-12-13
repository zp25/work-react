import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {
  asyncStart,
} from 'actions/asyncTask';
import { asyncDone } from 'actions';

function* done() {
  yield delay(600);
  yield put(asyncDone());
}

export default function* watchAsyncStart() {
  yield takeLatest(asyncStart.toString(), done);
}

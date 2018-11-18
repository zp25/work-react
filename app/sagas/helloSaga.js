import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { ASYNC_START } from 'constants/actionTypes';
import { asyncDone } from 'actions';

function* done() {
  yield delay(600);
  yield put(asyncDone());
}

export default function* watchAsyncStart() {
  yield takeLatest(ASYNC_START, done);
}

import { all } from 'redux-saga/effects';
import asyncTask from './asyncTask';

export default function* rootSaga() {
  yield all([
    asyncTask(),
  ]);
}

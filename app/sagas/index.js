import { all } from 'redux-saga/effects';
import asyncTask from './asyncTask';
import data from './data';

export default function* rootSaga() {
  yield all([
    asyncTask(),
    data(),
  ]);
}

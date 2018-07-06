import { takeLatest, all } from 'redux-saga/effects';
import haivan from '../api/haivan';
import { createRequestSaga } from '../sagas/common';
import { setToast } from '../actions/common';
import { replaceProfile } from '../actions/account';

const requestListChuyenDi = createRequestSaga({
  request: haivan.listChuyenDi,
  key: 'listChuyenDi',
  success: [],
  failure: [() => setToast("Couldn't get list", 'error')]
});

// root saga reducer
export default [
  function* fetchWatcher() {
    yield all([takeLatest('app/listChuyenDi', requestListChuyenDi)]);
  }
];

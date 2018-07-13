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

const requestGetSoDoGiuong = createRequestSaga({
  request: haivan.getSoDoGiuong,
  key: 'getSoDoGiuong',
  success: [],
  failure: [() => setToast('error', 'error')]
});

const requestListHuyVe = createRequestSaga({
  request: haivan.listHuyVe,
  key: 'listHuyVe',
  success: [],
  failure: [() => setToast('error', 'error')]
});

const requestListXuongXe = createRequestSaga({
  request: haivan.listXuongXe,
  key: 'listXuongXe',
  success: [],
  failure: [() => setToast('error', 'error')]
});

const requestMenu = createRequestSaga({
  request: haivan.getMenu,
  key: 'getMenu',
  success: [],
  failure: [() => setToast('error', 'error')]
});

const requestCheckSuDungVe = createRequestSaga({
  request: haivan.checkSuDungVe,
  key: 'checkSuDungVe',
  success: [],
  failure: [() => setToast('error', 'error')]
});

const requestCheckVersion = createRequestSaga({
  request: haivan.checkVersion,
  key: 'checkVersion',
  success: [],
  failure: [() => setToast('error', 'error')]
});

// root saga reducer
export default [
  function* fetchWatcher() {
    yield all([
      takeLatest('app/listChuyenDi', requestListChuyenDi),
      takeLatest('app/getSoDoGiuong', requestGetSoDoGiuong),
      takeLatest('app/listHuyVe', requestListHuyVe),
      takeLatest('app/listXuongXe', requestListXuongXe),
      takeLatest('app/getMenu', requestMenu),
      takeLatest('app/checkSuDungVe', requestCheckSuDungVe),
      takeLatest('app/checkVersion', requestCheckVersion)
    ]);
  }
];

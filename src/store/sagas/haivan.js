import { takeLatest, all } from 'redux-saga/effects';
import haivan from '../api/haivan';
import { createRequestSaga } from '../sagas/common';
import { setToast } from '../actions/common';
import { saveDanhMucVe } from '../actions/haivan';

const requestListChuyenDi = createRequestSaga({
  request: haivan.listChuyenDi,
  key: 'listChuyenDi',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại', 'error')]
});

const requestGetSoDoGiuong = createRequestSaga({
  request: haivan.getSoDoGiuong,
  key: 'getSoDoGiuong',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại', 'error')]
});

const requestListHuyVe = createRequestSaga({
  request: haivan.listHuyVe,
  key: 'listHuyVe',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestListXuongXe = createRequestSaga({
  request: haivan.listXuongXe,
  key: 'listXuongXe',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại', 'error')]
});

const requestMenu = createRequestSaga({
  request: haivan.getMenu,
  key: 'getMenu',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestCheckSuDungVe = createRequestSaga({
  request: haivan.checkSuDungVe,
  key: 'checkSuDungVe',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestCheckVersion = createRequestSaga({
  request: haivan.checkVersion,
  key: 'checkVersion',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestInsertVe = createRequestSaga({
  request: haivan.insertVe,
  key: 'insertVe',
  success: [],
  failure: [() => setToast('lỗi, xin vui lòng gửi lại', 'error')]
});

const requestUpdateVe = createRequestSaga({
  request: haivan.updateVe,
  key: 'updateVe',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestGetDanhMucVe = createRequestSaga({
  request: haivan.getDanhMucVe,
  key: 'getDanhMucVe',
  success: [data => saveDanhMucVe(data)],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestGetSeriMin = createRequestSaga({
  request: haivan.getSeriMin,
  key: 'getSeriMin',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestXuongXe = createRequestSaga({
  request: haivan.xuongXe,
  key: 'xuongXe',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại', 'error')]
});

const requestGiamGiaTreEm = createRequestSaga({
  request: haivan.giamGiaTreEm,
  key: 'giamGiaTreEm',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại vé', 'error')]
});

const requestGiamGiaText = createRequestSaga({
  request: haivan.giamGiaText,
  key: 'giamGiaText',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng gửi lại mã', 'error')]
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
      takeLatest('app/checkVersion', requestCheckVersion),
      takeLatest('app/insertVe', requestInsertVe),
      takeLatest('app/getDanhMucVe', requestGetDanhMucVe),
      takeLatest('app/getSeriMin', requestGetSeriMin),
      takeLatest('app/updateVe', requestUpdateVe),
      takeLatest('app/xuongXe', requestXuongXe),
      takeLatest('app/giamGiaTreEm', requestGiamGiaTreEm),
      takeLatest('app/giamGiaText', requestGiamGiaText)
    ]);
  }
];

import { takeLatest, all } from 'redux-saga/effects';
import haivan from '../api/haivan';
import { createRequestSaga } from '../sagas/common';
import { setToast } from '../actions/common';
import { saveDanhMucVe, saveInfoDieuHanh } from '../actions/haivan';

const requestListChuyenDi = createRequestSaga({
  request: haivan.listChuyenDi,
  key: 'listChuyenDi',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được danh sách chuyến đi', 'error')]
});

const requestGetSoDoGiuong = createRequestSaga({
  request: haivan.getSoDoGiuong,
  key: 'getSoDoGiuong',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được sơ đồ giường', 'error')]
});

const requestListHuyVe = createRequestSaga({
  request: haivan.listHuyVe,
  key: 'listHuyVe',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được danh sách', 'error')]
});

const requestListXuongXe = createRequestSaga({
  request: haivan.listXuongXe,
  key: 'listXuongXe',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được danh sách', 'error')]
});

const requestMenu = createRequestSaga({
  request: haivan.getMenu,
  key: 'getMenu',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được menu', 'error')]
});

const requestCheckVersion = createRequestSaga({
  request: haivan.checkVersion,
  key: 'checkVersion',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được version', 'error')]
});

const requestInsertVe = createRequestSaga({
  request: haivan.insertVe,
  key: 'insertVe',
  success: [],
  failure: []
});

const requestUpdateVe = createRequestSaga({
  request: haivan.updateVe,
  key: 'updateVe',
  success: [],
  failure: [() => setToast('Lỗi, Không cập nhật được vé', 'error')]
});

const requestGetDanhMucVe = createRequestSaga({
  request: haivan.getDanhMucVe,
  key: 'getDanhMucVe',
  success: [data => saveDanhMucVe(data)],
  failure: [() => setToast('Lỗi, không lấy được danh mục vé', 'error')]
});

const requestGetSeriMin = createRequestSaga({
  request: haivan.getSeriMin,
  key: 'getSeriMin',
  success: [],
  failure: [() => setToast('Lỗi, không lấy được seri vé', 'error')]
});

const requestXuongXe = createRequestSaga({
  request: haivan.xuongXe,
  key: 'xuongXe',
  success: [],
  failure: []
});

const requestGiamGiaTreEm = createRequestSaga({
  request: haivan.giamGiaTreEm,
  key: 'giamGiaTreEm',
  success: [],
  failure: [() => setToast('Lỗi, không lấy được giảm giá', 'error')]
});

const requestGiamGiaText = createRequestSaga({
  request: haivan.giamGiaText,
  key: 'giamGiaText',
  success: [],
  failure: []
});

const requestHuyVe = createRequestSaga({
  request: haivan.huyVe,
  key: 'huyVe',
  success: [],
  failure: [() => setToast('Lỗi, Không huỷ được vé', 'error')]
});

const requestDanhSachCho = createRequestSaga({
  request: haivan.danhSachCho,
  key: 'danhSachCho',
  success: [],
  failure: [() => setToast('Lỗi, Không lấy được danh sách chờ', 'error')]
});

const requestChuyenCho = createRequestSaga({
  request: haivan.chuyenCho,
  key: 'chuyenCho',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestXepChoGheCho = createRequestSaga({
  request: haivan.xepChoGheCho,
  key: 'xepChoGheCho',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestCheckSuDungVe = createRequestSaga({
  request: haivan.checkSuDungVe,
  key: 'checkSuDungVe',
  success: [],
  failure: []
});

const requestRemoveGhe = createRequestSaga({
  request: haivan.removeGhe,
  key: 'removeGhe',
  success: [],
  failure: [
    () =>
      setToast('Lỗi, Không chuyển được chỗ, xin vui lòng thử lại sau', 'error')
  ]
});

const requestThemVe = createRequestSaga({
  request: haivan.themVe,
  key: 'themVe',
  success: [],
  failure: [
    () => setToast('Lỗi, Không thêm được vé, xin vui lòng thử lại sau', 'error')
  ]
});

const requestLenXe = createRequestSaga({
  request: haivan.lenXe,
  key: 'lenXe',
  success: [],
  failure: [
    () => setToast('Lỗi, Không lên được xe, xin vui lòng thử lại sau', 'error')
  ]
});

const requestTraKhach = createRequestSaga({
  request: haivan.traKhach,
  key: 'traKhach',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestDanhSachGoi = createRequestSaga({
  request: haivan.danhSachGoi,
  key: 'danhSachGoi',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestGetDoanhThu = createRequestSaga({
  request: haivan.getDoanhThu,
  key: 'getDoanhThu',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestChangePassword = createRequestSaga({
  request: haivan.changePassword,
  key: 'changePassword',
  success: [data => setToast('Đổi mật khẩu thành công', 'error')],
  failure: []
});

const requestGetInfoDieuHanh = createRequestSaga({
  request: haivan.getInfoDieuHanh,
  key: 'getInfoDieuHanh',
  success: [],
  failure: [() => setToast('Lỗi, xin vui lòng thử lại sau', 'error')]
});

const requestSaveDieuHanh = createRequestSaga({
  request: haivan.saveDieuHanh,
  key: 'saveDieuHanh',
  success: [() => setToast('Cập nhật thành công')],
  failure: []
});

const requestGetInfoThanhTra = createRequestSaga({
  request: haivan.getInfoThanhTra,
  key: 'getInfoThanhTra',
  success: [],
  failure: [() => setToast('Lỗi, không thể lấy dữ liệu thanh tra', 'error')]
});

const requestGetChiPhi = createRequestSaga({
  request: haivan.getChiPhi,
  key: 'getChiPhi',
  success: [],
  failure: [() => setToast('Lỗi, không thể lấy dữ liệu chi phí', 'error')]
});

const requestSaveChiPhi = createRequestSaga({
  request: haivan.saveChiPhi,
  key: 'saveChiPhi',
  success: [],
  failure: [() => setToast('Lỗi, không thể cập nhật dữ liệu', 'error')]
});

const requestXuongXeAll = createRequestSaga({
  request: haivan.xuongXeAll,
  key: 'xuongXeAll',
  success: [],
  failure: [() => setToast('Lỗi, không thể cập nhật dữ liệu', 'error')]
});

const requestEditInfoThanhTra = createRequestSaga({
  request: haivan.editInfoThanhTra,
  key: 'editInfoThanhTra',
  success: [],
  failure: [() => setToast('Lỗi, không thể cập nhật dữ liệu', 'error')]
});

const requestGetListThanhTra = createRequestSaga({
  request: haivan.getListThanhTra,
  key: 'getListThanhTra',
  success: [],
  failure: [() => setToast('Lỗi, không thể lấy dữ liệu thanh tra', 'error')]
});

const requestUpdateDoanhThuHang = createRequestSaga({
  request: haivan.updateDoanhThuHang,
  key: 'updateDoanhThuHang',
  success: [() => setToast('Thành công')],
  failure: [() => setToast('Lỗi, không thể cập nhật dữ liệu', 'error')]
});

const requestGetListNhienLieu = createRequestSaga({
  request: haivan.getListNhienLieu,
  key: 'getListNhienLieu',
  success: [],
  failure: [() => setToast('Lỗi, không thể lấy dữ liệu', 'error')]
});

const requestUpdateNhienLieu = createRequestSaga({
  request: haivan.updateNhienLieu,
  key: 'updateNhienLieu',
  success: [],
  failure: []
});

const requestGetNCC = createRequestSaga({
  request: haivan.getNCC,
  key: 'getNCC',
  success: [],
  failure: [() => setToast('Lỗi, Không thể lấy dữ liệu nhà cung cấp', 'error')]
});

const requestGetThanhTraChuyenDi = createRequestSaga({
  request: haivan.getThanhTraChuyenDi,
  key: 'getThanhTraChuyenDi',
  success: [],
  failure: [() => setToast('Lỗi, Không thể lấy dữ liệu', 'error')]
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
      takeLatest('app/checkVersion', requestCheckVersion),
      takeLatest('app/insertVe', requestInsertVe),
      takeLatest('app/getDanhMucVe', requestGetDanhMucVe),
      takeLatest('app/getSeriMin', requestGetSeriMin),
      takeLatest('app/updateVe', requestUpdateVe),
      takeLatest('app/xuongXe', requestXuongXe),
      takeLatest('app/giamGiaTreEm', requestGiamGiaTreEm),
      takeLatest('app/giamGiaText', requestGiamGiaText),
      takeLatest('app/huyVe', requestHuyVe),
      takeLatest('app/danhSachCho', requestDanhSachCho),
      takeLatest('app/chuyenCho', requestChuyenCho),
      takeLatest('app/xepChoGheCho', requestXepChoGheCho),
      takeLatest('app/checkSuDungVe', requestCheckSuDungVe),
      takeLatest('app/removeGhe', requestRemoveGhe),
      takeLatest('app/themVe', requestThemVe),
      takeLatest('app/lenXe', requestLenXe),
      takeLatest('app/traKhach', requestTraKhach),
      takeLatest('app/danhSachGoi', requestDanhSachGoi),
      takeLatest('app/getDoanhThu', requestGetDoanhThu),
      takeLatest('app/changePassword', requestChangePassword),
      takeLatest('app/getInfoDieuHanh', requestGetInfoDieuHanh),
      takeLatest('app/saveDieuHanh', requestSaveDieuHanh),
      takeLatest('app/getInfoThanhTra', requestGetInfoThanhTra),
      takeLatest('app/getChiPhi', requestGetChiPhi),
      takeLatest('app/saveChiPhi', requestSaveChiPhi),
      takeLatest('app/xuongXeAll', requestXuongXeAll),
      takeLatest('app/editInfoThanhTra', requestEditInfoThanhTra),
      takeLatest('app/getListThanhTra', requestGetListThanhTra),
      takeLatest('app/updateDoanhThuHang', requestUpdateDoanhThuHang),
      takeLatest('app/getListNhienLieu', requestGetListNhienLieu),
      takeLatest('app/updateNhienLieu', requestUpdateNhienLieu),
      takeLatest('app/getNCC', requestGetNCC),
      takeLatest('app/getThanhTraChuyenDi', requestGetThanhTraChuyenDi)
    ]);
  }
];

//list chuyến đi
export const listChuyenDi = (...args) => ({ type: 'app/listChuyenDi', args });

//lich dieu hanh

export const lichDieuHanh = (...args) => ({ type: 'app/lichDieuHanh', args });

export const getSoDoGiuong = (...args) => ({ type: 'app/getSoDoGiuong', args });

export const saveTimeChuyenDi = data => ({
  type: 'app/saveTimeChuyenDi',
  payload: data
});

export const saveChuyenDi = data => ({
  type: 'app/saveChuyenDi',
  payload: data
});

export const listHuyVe = (...args) => ({ type: 'app/listHuyVe', args });
export const listXuongXe = (...args) => ({ type: 'app/listXuongXe', args });
export const getMenu = (...args) => ({ type: 'app/getMenu', args });
export const saveMenu = data => ({ type: 'app/saveMenu', payload: data });

export const checkVersion = (...args) => ({ type: 'app/checkVersion', args });
export const insertVe = (...args) => ({ type: 'app/insertVe', args });
export const getDanhMucVe = (...args) => ({ type: 'app/getDanhMucVe', args });

export const saveDanhMucVe = payload => ({
  type: 'app/saveDanhMucVe',
  payload
});

export const getSeriMin = (...args) => ({ type: 'app/getSeriMin', args });
export const updateVe = (...args) => ({ type: 'app/updateVe', args });
export const saveVe = payload => ({ type: 'app/saveVe', payload });
export const xuongXe = (...args) => ({ type: 'app/xuongXe', args });
export const giamGiaTreEm = (...args) => ({ type: 'app/giamGiaTreEm', args });
export const giamGiaText = (...args) => ({ type: 'app/giamGiaText', args });
export const huyVe = (...args) => ({ type: 'app/huyVe', args });

//danh sách chờ
export const danhSachCho = (...args) => ({ type: 'app/danhSachCho', args });
export const chuyenCho = (...args) => ({ type: 'app/chuyenCho', args });

//xếp chỗ cho ghế chờ
export const xepChoGheCho = (...args) => ({ type: 'app/xepChoGheCho', args });
export const actionXepCho = payload => ({ type: 'app/actionXepCho', payload });

//check sử dụng vé
export const checkSuDungVe = (...args) => ({ type: 'app/checkSuDungVe', args });

//chuyển chỗ
export const actionRemoveGhe = payload => ({
  type: 'app/actionRemoveGhe',
  payload
});
export const removeGhe = (...args) => ({ type: 'app/removeGhe', args });

//thêm vé
export const themVe = (...args) => ({ type: 'app/themVe', args });
export const actionThemVe = payload => ({ type: 'app/actionThemVe', payload });

//lên xe
export const lenXe = (...args) => ({ type: 'app/lenXe', args });

// trả khách
export const traKhach = (...args) => ({ type: 'app/traKhach', args });

// danh sách gọi
export const danhSachGoi = (...args) => ({ type: 'app/danhSachGoi', args });

// request offline
export const saveOffline = payload => ({ type: 'app/saveOffline', payload });
export const subObjOffline = payload => ({
  type: 'app/subObjOffline',
  payload
});
export const saveConnect = payload => ({ type: 'app/saveConnect', payload });

//cập nhật sơ đồ giường
export const actionUpdateSDG = payload => ({
  type: 'app/actionUpdateSDG',
  payload
});

//doanh thu vé

export const getDoanhThu = (...args) => ({ type: 'app/getDoanhThu', args });

//đổi mật khẩu

export const changePassword = (...args) => ({
  type: 'app/changePassword',
  args
});

export const getInfoDieuHanh = (...args) => ({
  type: 'app/getInfoDieuHanh',
  args
});

export const saveInfoDieuHanh = payload => ({
  type: 'app/saveInfoDieuHanh',
  payload
});

//xếp lại lịchd điều hành
export const saveDieuHanh = (...args) => ({ type: 'app/saveDieuHanh', args });

//cập nhật danh sách chuyến

export const actionUpdateChuyen = payload => ({
  type: 'app/actionUpdateChuyen',
  payload
});

// thanh tra

export const getInfoThanhTra = (...args) => ({
  type: 'app/getInfoThanhTra',
  args
});

// edit thanh tra
export const editInfoThanhTra = (...args) => ({
  type: 'app/editInfoThanhTra',
  args
});

//lấy danh mục chi phí
export const getChiPhi = (...args) => ({ type: 'app/getChiPhi', args });

//save chi phí

export const saveChiPhi = (...args) => ({ type: 'app/saveChiPhi', args });

//xuống xe all
export const xuongXeAll = (...args) => ({ type: 'app/xuongXeAll', args });

export const getListThanhTra = (...args) => ({
  type: 'app/getListThanhTra',
  args
});

export const updateDoanhThuHang = (...args) => ({
  type: 'app/updateDoanhThuHang',
  args
});

export const getListNhienLieu = (...args) => ({
  type: 'app/getListNhienLieu',
  args
});

export const actionUpdateListNhienLieu = payload => ({
  type: 'app/actionUpdateListNhienLieu',
  payload
});

export const updateNhienLieu = (...args) => ({
  type: 'app/updateNhienLieu',
  args
});

export const getNCC = (...args) => ({
  type: 'app/getNCC',
  args
});

export const saveThanhTraData = payload => ({
  type: 'app/saveThanhTraData',
  payload
});

export const getThanhTraChuyenDi = (...args) => ({
  type: 'app/getThanhTraChuyenDi',
  args
});

export const actionUpdateThanhTraView = payload => ({
  type: 'app/actionUpdateThanhTraView',
  payload
});

export const actionUpdateDieuDo = payload => ({
  type: 'app/actionUpdateDieuDo',
  payload
});

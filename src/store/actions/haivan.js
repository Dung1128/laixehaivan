//list chuyến đi
export const listChuyenDi = (...args) => ({ type: 'app/listChuyenDi', args });

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

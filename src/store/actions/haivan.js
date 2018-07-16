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
export const checkSuDungVe = (...args) => ({ type: 'app/checkSuDungVe', args });
export const checkVersion = (...args) => ({ type: 'app/checkVersion', args });
export const insertVe = (...args) => ({ type: 'app/insertVe', args });
export const getDanhMucVe = (...args) => ({ type: 'app/getDanhMucVe', args });

export const saveDanhMucVe = payload => ({
  type: 'app/saveDanhMucVe',
  payload
});

export const getSeriMin = (...args) => ({ type: 'app/getSeriMin', args });

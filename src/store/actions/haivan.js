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

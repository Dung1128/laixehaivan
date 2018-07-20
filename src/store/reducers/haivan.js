const init = {
  timeChuyenDi: new Date(),
  chuyenDi: null,
  menu: [],
  danhMucVe: {
    dataDM: []
  },
  detailVe: {
    arrVe: {},
    bvv_number: 0
  },
  actionXepCho: false,
  actionRemoveGhe: false,
  actionThemVe: false
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case 'app/saveTimeChuyenDi':
      return { ...state, timeChuyenDi: payload };
    case 'app/saveChuyenDi':
      return { ...state, chuyenDi: payload };
    case 'app/saveMenu':
      return { ...state, menu: payload };
    case 'app/saveDanhMucVe':
      return { ...state, danhMucVe: payload };
    case 'app/saveVe':
      return { ...state, detailVe: payload };
    case 'app/actionXepCho':
      return { ...state, actionXepCho: payload };
    case 'app/actionRemoveGhe':
      return { ...state, actionRemoveGhe: payload };
    case 'app/actionThemVe':
      return { ...state, actionThemVe: payload };
    default:
      return state;
  }
};

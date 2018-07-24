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
  actionThemVe: false,
  dataOffline: [],
  saveConnect: true,
  UpdateSDG: new Date()
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
    case 'app/saveOffline': {
      const newArray = [];
      newArray.push(payload);
      return { ...state, dataOffline: [...state.dataOffline, ...newArray] };
    }
    case 'app/subObjOffline':
      return { ...state, dataOffline: payload };
    case 'app/saveConnect': {
      return { ...state, saveConnect: payload };
    }
    case 'app/actionUpdateSDG': {
      return { ...state, UpdateSDG: payload };
    }
    default:
      return state;
  }
};

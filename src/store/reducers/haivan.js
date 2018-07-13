const init = {
  timeChuyenDi: new Date(),
  chuyenDi: null,
  menu: []
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case 'app/saveTimeChuyenDi':
      return { ...state, timeChuyenDi: payload };
    case 'app/saveChuyenDi':
      return { ...state, chuyenDi: payload };
    case 'app/saveMenu':
      return { ...state, menu: payload };
    default:
      return state;
  }
};

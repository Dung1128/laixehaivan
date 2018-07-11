const init = {
  timeChuyenDi: new Date(),
  chuyenDi: null
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case 'app/saveTimeChuyenDi':
      return { ...state, timeChuyenDi: payload };
    case 'app/saveChuyenDi':
      return { ...state, chuyenDi: payload };
    default:
      return state;
  }
};

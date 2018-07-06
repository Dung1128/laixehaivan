export const isLogged = state => state.auth.loggedIn;
export const getToken = state => {
  if (!state.auth.user.token) return null;
  return state.auth.user.token || null;
};
export const getUser = state => state.auth.user || {};
// export const getSocialType = state => state.auth.socialType || {};

export const isLogged = state => state.auth.loggedIn;
export const getToken = state => {
  if (!state.auth.token) return null;
  return state.auth.token || null;
};
export const getUser = state => state.auth.user || {};
export const getSocialType = state => state.auth.socialType || {};

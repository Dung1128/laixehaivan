import { API, API2, urlEncode } from './common';

export default {
  login: (username, password, type) =>
    API.post(`/api/appdriver/login`, { username, password }, {}),
  facebookLogin: facebookToken =>
    API.post('/api/fb_authenticate', { fb_access_token: facebookToken }),
  googleLogin: googleToken =>
    API.post('/api/gg_authenticate', { gg_access_token: googleToken }),
  registerAccount: (params = {}) =>
    API2.post('/api/register', urlEncode(params)),
  disconnectFCM: (token, device) =>
    API.get(
      `/api/user/invalidate?device=${device}`,
      {},
      {
        headers: { Authorization: token }
      }
    )
};

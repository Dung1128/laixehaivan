import { API, API2, urlEncode } from './common';

export default {
  listChuyenDi: params =>
    API.get(
      `/api/laixe_v1/get_list_chuyen.php?day=${params.day}&adm_id=${
        params.adm_id
      }&token=${params.token}`,
      {},
      {}
    )
  // facebookLogin: facebookToken =>
  //   API.post('/api/fb_authenticate', { fb_access_token: facebookToken }),
  // googleLogin: googleToken =>
  //   API.post('/api/gg_authenticate', { gg_access_token: googleToken }),
  // registerAccount: (params = {}) =>
  //   API2.post('/api/register', urlEncode(params)),
  // disconnectFCM: (token, device) =>
  //   API.get(
  //     `/api/user/invalidate?device=${device}`,
  //     {},
  //     {
  //       headers: { Authorization: token }
  //     }
  //   )
};

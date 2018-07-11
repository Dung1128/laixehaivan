import { API, API2, urlEncode } from './common';

export default {
  listChuyenDi: params =>
    API.get(
      `/api/appdriver/get-list-chuyen?adm_id=${params.adm_id}&token=${
        params.token
      }&day=${params.day}`,
      {},
      {}
    ),

  getSoDoGiuong: params =>
    API.get(
      `/api/appdriver/get-so-do-giuong?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  listHuyVe: params =>
    API.get(
      `/api/appdriver/danh-sach-huy?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  listXuongXe: params =>
    API.get(
      `/api/appdriver/danh-sach-xuong-xe?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
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

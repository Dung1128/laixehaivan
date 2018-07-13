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
    ),

  getMenu: params =>
    API.get(
      `/api/appdriver/menu?adm_id=${params.adm_id}&token=${params.token}`
    ),

  checkSuDungVe: params =>
    API.get(
      `/api/appdriver/check-ve?adm_id=${params.adm_id}&token=${
        params.token
      }&bvv_number=${bvv_number}&bvv_id=${bvv_id}`
    ),

  checkVersion: params =>
    API.get(
      `/api/appdriver/check-version?type=${params.type}&currentVersion=${
        params.currentVersion
      }`
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

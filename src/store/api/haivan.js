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
    ),

  insertVe: params =>
    API.post(
      `/api/appdriver/insert-ve`,
      {
        adm_id: params.adm_id,
        token: params.token,
        did_id: params.did_id,
        bvv_id: params.bvv_id,
        diem_a: params.diem_a,
        diem_b: params.diem_b,
        seri: params.seri,
        key_danh_muc: params.key_danh_muc,
        price: params.price,
        phone: params.phone,
        fullName: params.fullname,
        diem_don: params.diem_don,
        diem_tra: params.diem_tra,
        ghi_chu: params.ghi_chu,
        trung_chuyen_don: params.trung_chuyen_don,
        trung_chuyen_tra: params.trung_chuyen_tra,
        hinh_thuc_giam_gia: params.hinh_thuc_giam_gia,
        giam_gia_text: params.giam_gia_text
      },
      {}
    ),
  getDanhMucVe: params =>
    API.get(
      `/api/appdriver/get-danh-muc-ve?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  getSeriMin: params =>
    API.get(
      `/api/appdriver/get-seri-min?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&dm_id=${params.dm_id}&price=${params.price}`
    ),

  updateVe: params =>
    API.post(
      `/api/appdriver/update-ve`,
      {
        adm_id: params.adm_id,
        token: params.token,
        bvv_id: params.bvv_id,
        diem_a: params.diem_a,
        diem_b: params.diem_b,
        did_id: params.did_id,
        phone: params.phone,
        fullName: params.fullname,
        diem_don: params.diem_don,
        diem_tra: params.diem_tra,
        ghi_chu: params.ghi_chu,
        seri: params.seri,
        key_danh_muc: params.key_danh_muc,
        price: params.price,
        trung_chuyen_don: params.trung_chuyen_don,
        trung_chuyen_tra: params.trung_chuyen_tra
      },
      {}
    ),

  xuongXe: params =>
    API.get(
      `/api/appdriver/xuong-xe?adm_id=${params.adm_id}&token=${
        params.token
      }&bvv_id=${params.bvv_id}`
    ),

  giamGiaTreEm: params =>
    API.get(
      `/api/appdriver/get-giam-gia-tre-em?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&bvv_id=${params.bvv_id}&diem_a=${
        params.diem_a
      }&diem_b=${params.diem_b}`
    ),

  giamGiaText: params =>
    API.get(
      `/api/appdriver/get-giam-gia-text?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&bvv_id=${params.bvv_id}&diem_a=${
        params.diem_a
      }&diem_b=${params.diem_b}&phone=${params.phone}&giam_gia_text=${
        params.giam_gia_text
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

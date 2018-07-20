import { API, API2, urlEncode, serialize } from './common';

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
        giam_gia_text: params.giam_gia_text,
        bvv_ten_khach_hang_di: params.bvv_ten_khach_hang_di,
        bvv_phone_di: params.bvv_phone_di,
        price_truc_tiep: params.price_truc_tiep
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
        trung_chuyen_tra: params.trung_chuyen_tra,
        bvv_ten_khach_hang_di: params.bvv_ten_khach_hang_di,
        bvv_phone_di: params.bvv_phone_di,
        price_truc_tiep: params.price_truc_tiep,
        hinh_thuc_giam_gia: params.hinh_thuc_giam_gia,
        giam_gia_text: params.giam_gia_text
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
    ),

  huyVe: params =>
    API.post(
      `/api/appdriver/huy-ve?adm_id=${params.adm_id}&token=${
        params.token
      }&bvv_id=${params.bvv_id}`
    ),

  danhSachCho: params =>
    API.get(
      `/api/appdriver/get-danh-sach-cho?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  //chuyển ghế chờ
  chuyenCho: params =>
    API.post(
      `/api/appdriver/chuyen-wait?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&bvv_id_can_chuyen=${params.bvv_id_can_chuyen}`
    ),

  //xếp chỗ ghế chờ
  xepChoGheCho: params =>
    API.post(
      `/api/appdriver/chuyen-wait-back?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&bvh_id_can_chuyen=${
        params.bvh_id_can_chuyen
      }&bvv_number_muon_chuyen=${params.bvv_number_muon_chuyen}&huy=false`
    ),

  checkSuDungVe: params =>
    API.get(
      `/api/appdriver/check-ve?adm_id=${params.adm_id}&token=${
        params.token
      }&bvv_number=${params.bvv_number}&bvv_id=${params.bvv_id}`
    ),

  //đổi ghế
  removeGhe: params =>
    API.post(
      `/api/appdriver/chuyen-seat?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}&bvv_number_muon_chuyen=${
        params.bvv_number_muon_chuyen
      }&bvv_id_can_chuyen=${params.bvv_id_can_chuyen}&diem_a=${
        params.diem_a
      }&diem_b=${params.diem_b}`
    ),

  //them ve

  themVe: params =>
    API.post(
      `/api/appdriver/them-ve`,
      {
        adm_id: params.adm_id,
        token: params.token,
        did_id: params.did_id,
        bvv_id_1: params.bvv_id1,
        bvv_id_2: params.bvv_id2
      },
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

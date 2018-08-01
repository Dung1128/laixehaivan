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
    ),

  lenXe: params =>
    API.post(
      `/api/appdriver/len-xe?adm_id=${params.adm_id}&token=${
        params.token
      }&bvv_id=${params.bvv_id}`
    ),

  traKhach: params =>
    API.get(
      `/api/appdriver/danh-sach-cho-xuong-xe?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  danhSachGoi: params =>
    API.get(
      `/api/appdriver/danh-sach-goi?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  getDoanhThu: params =>
    API.get(
      `/api/appdriver/get-danh-thu?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  changePassword: params =>
    API.post(
      `/api/appdriver/change-password?adm_id=${params.adm_id}&token=${
        params.token
      }&password=${params.password}&passwordOld=${params.passwordOld}`
    ),

  getInfoDieuHanh: params =>
    API.get(
      `/api/appdriver/dieu-hanh/get-info?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  saveDieuHanh: params =>
    API.post(
      `/api/appdriver/dieu-hanh/save`,
      {
        adm_id: params.adm_id,
        token: params.token,
        did_id: params.did_id,
        xe_id: params.xe_id,
        lx_id_1: params.lx_id_1,
        lx_id_2: params.lx_id_2,
        tv_id: params.tv_id,
        did_gio_xuat_ben_that: params.did_gio_xuat_ben_that,
        did_gio_dieu_hanh: params.did_gio_dieu_hanh
      },
      {}
    ),

  getInfoThanhTra: params =>
    API.get(
      `/api/appdriver/thanh-tra/get-info?adm_id=${params.adm_id}&token=${
        params.token
      }`
    ),

  getChiPhi: params =>
    API.get(
      `/api/appdriver/get-chi-phi?adm_id=${params.adm_id}&token=${
        params.token
      }&did_id=${params.did_id}`
    ),

  saveChiPhi: params =>
    API.post(
      `/api/appdriver/save-chi-phi?adm_id=${params.adm_id}&token=${
        params.token
      }`,
      {
        did_id: params.did_id,
        arrChiPhi: params.arrChiPhi
      },
      {}
    ),

  xuongXeAll: params =>
    API.post(
      `/api/appdriver/xuong-xe-all?adm_id=${params.adm_id}&token=${
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

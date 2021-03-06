import Notification from './container/Notification';

//new version

import ChuyenDiCuaBan from './container/ChuyenDiCuaBan';
import BangDieuDo from './container/BangDieuDo';
import LichDieuHanh from './container/LichDieuHanh';
import ThanhTra from './container/ThanhTra';
import ThanhTraDetail from './container/ThanhTraDetail';
import ThanhTraList from './container/ThanhTraList';
import ThanhTraView from './container/ThanhTraView';
import LichSuThanhTra from './container/LichSuThanhTra';
import HuongDanSuDung from './container/HuongDanSuDung';
import NhapMaXe from './container/NhapMaXe';
import Login from './container/Login';
import Register from './container/Register';
import ResetPassword from './container/ResetPassword';
import DoiMatKhau from './container/DoiMatKhau';
import SoDoGiuong from './container/SoDoGiuong';
import SoDoGiuongHandle from './container/SoDoGiuongHandle';
import TraKhach from './container/TraKhach';
import DangCho from './container/DangCho';
import DoanhThu from './container/DoanhThu';
import DanhSachGoi from './container/DanhSachGoi';
import HuyVe from './container/HuyVe';
import XuongXe from './container/XuongXe';
import ThemVe from './container/ThemVe';
import AddBangDieuDo from './container/AddBangDieuDo';
import VeOffline from './container/VeOffline';
import ChiPhiChuyenDi from './container/ChiPhiChuyenDi';
import DoanhThuHang from './container/DoanhThuHang';
import NhienLieu from './container/NhienLieu';
import AddNhienLieu from './container/AddNhienLieu';

export default {
  //new
  chuyenDiCuaBan: {
    title: 'Chuyến đi của bạn',
    Page: ChuyenDiCuaBan,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  bangDieuDo: {
    title: 'Bảng điều độ',
    Page: BangDieuDo,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  lichDieuHanh: {
    title: 'Lịch điều hành',
    Page: LichDieuHanh,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  lichSuThanhTra: {
    title: 'Lịch sử thanh tra',
    Page: LichSuThanhTra,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  thanhTra: {
    title: 'Thanh tra',
    Page: ThanhTra,
    headerType: 'back',
    footerType: 'none',
    cache: false
  },
  thanhTraList: {
    title: 'Thanh tra',
    Page: ThanhTraList,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  thanhTraView: {
    title: 'Danh sách thanh tra',
    Page: ThanhTraView,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  thanhTraDetail: {
    title: 'Chi tiết',
    Page: ThanhTraDetail,
    headerType: 'back',
    footerType: 'none',
    cache: false
  },
  huongDanSuDung: {
    title: 'Hướng dẫn sử dụng',
    Page: HuongDanSuDung,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  nhapMaXe: {
    title: 'Nhập mã xe',
    Page: NhapMaXe,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },
  login: {
    title: 'Login',
    Page: Login,
    headerType: 'none',
    footerType: 'none',
    cache: true
  },
  register: {
    title: 'Register',
    Page: Register,
    headerType: 'back',
    footerType: 'none',
    cache: true
  },
  resetPassword: {
    title: 'Reset to password',
    Page: ResetPassword,
    headerType: 'back',
    footerType: 'none',
    cache: true
  },
  doiMatKhau: {
    title: 'Đổi mật khẩu',
    Page: DoiMatKhau,
    headerType: 'home',
    footerType: 'none',
    cache: true
  },

  soDoGiuong: {
    title: 'Sơ đồ giường',
    Page: SoDoGiuong,
    headerType: 'soDoGiuong',
    footerType: 'home',
    cache: true
  },

  soDoGiuongHandle: {
    title: 'Chỉnh sửa',
    Page: SoDoGiuongHandle,
    headerType: 'back',
    footerType: 'none',
    cache: false
  },

  traKhach: {
    title: 'Trả khách',
    Page: TraKhach,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  dangCho: {
    title: 'Danh sách đang chờ',
    Page: DangCho,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  doanhThu: {
    title: 'Doanh thu',
    Page: DoanhThu,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  danhSachGoi: {
    title: 'Danh sách gọi',
    Page: DanhSachGoi,
    headerType: 'home',
    footerType: 'home',
    cache: true
  },
  huyVe: {
    title: 'Danh sách huỷ vé',
    Page: HuyVe,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  xuongXe: {
    title: 'Danh sách xuống xe',
    Page: XuongXe,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  themVe: {
    title: 'Thêm Vé',
    Page: ThemVe,
    headerType: 'back',
    footerType: 'home',
    cache: false
  },
  addBangDieuDo: {
    title: 'Chỉnh sửa',
    Page: AddBangDieuDo,
    headerType: 'back',
    footerType: 'none',
    cache: false
  },
  notification: {
    title: 'Notification',
    Page: Notification,
    headerType: 'back',
    footerType: 'none'
  },
  notFound: {
    title: 'Notification',
    Page: Notification,
    headerType: 'none',
    footerType: 'none',
    cache: true
  },
  veOffline: {
    title: 'Vé offline',
    Page: VeOffline,
    headerType: 'home',
    footerType: 'home',
    cache: true
  },
  chiPhiChuyenDi: {
    title: 'Chi phí',
    Page: ChiPhiChuyenDi,
    headerType: 'home',
    footerType: 'home',
    cache: false
  },
  doanhThuHang: {
    title: 'Doanh Thu Hàng',
    Page: DoanhThuHang,
    headerType: 'home',
    footerType: 'home',
    cache: true
  },
  nhienLieu: {
    title: 'Nhiên liệu',
    Page: NhienLieu,
    headerType: 'home',
    footerType: 'home',
    cache: true
  },
  addNhienLieu: {
    title: 'Nhập nhiên liệu',
    Page: AddNhienLieu,
    headerType: 'back',
    footerType: 'home',
    cache: true
  }

  //new version
};

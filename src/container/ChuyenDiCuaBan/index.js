import React from 'react';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePicker from '../../components/DateTimePick';
import material from '../../theme/variables/material';
import { TabTask } from './tabTask';
import ChieuDi from './ChieuDi';
import ChieuVe from './ChieuVe';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

const dataTest = [
  {
    bvv_number: 1,
    arrVe: {
      bvv_id: 2627,
      bvv_giu_id: 0,
      bvv_giu_code: '',
      khuyen_mai_info: [],
      bvv_ten_khach_hang: '',
      bvv_phone: '',
      bvv_diem_don_khach: '',
      bvv_diem_tra_khach: '',
      bvv_trung_chuyen_a: 0,
      bvv_trung_chuyen_b: 0,
      bvv_ghi_chu: '',
      bvv_bvn_id: 123,
      bvv_bex_id_a: 0,
      bvv_bex_id_b: 0,
      bvv_number: 1,
      bvv_price: 0,
      bvv_status: 0,
      bvv_ben_a: '',
      bvv_ben_b: '',
      bvv_admin_creat: 0,
      bvv_time_book: 0,
      bvv_admin_update: 0,
      bvv_time_last_update: 0,
      bvv_seri: 0,
      bvv_bvd_id_ly_thuyet: 0,
      bvv_danh_muc: '',
      bvv_price_discount: 0,
      bvv_order_id: 0,
      bvv_hinh_thuc_giam_gia: 0,
      did_time: '',
      lai_xe_don: '',
      tre_em: false,
      lock: 1,
      stt_change: 0,
      sdgct_label_full: ''
    }
  },
  {
    bvv_number: 2,
    arrVe: {
      bvv_id: 2628,
      bvv_giu_id: 0,
      bvv_giu_code: '',
      khuyen_mai_info: [],
      bvv_ten_khach_hang: '',
      bvv_phone: '',
      bvv_diem_don_khach: '',
      bvv_diem_tra_khach: '',
      bvv_trung_chuyen_a: 0,
      bvv_trung_chuyen_b: 0,
      bvv_ghi_chu: '',
      bvv_bvn_id: 123,
      bvv_bex_id_a: 0,
      bvv_bex_id_b: 0,
      bvv_number: 2,
      bvv_price: 0,
      bvv_status: 0,
      bvv_ben_a: '',
      bvv_ben_b: '',
      bvv_admin_creat: 0,
      bvv_time_book: 0,
      bvv_admin_update: 0,
      bvv_time_last_update: 0,
      bvv_seri: 0,
      bvv_bvd_id_ly_thuyet: 0,
      bvv_danh_muc: '',
      bvv_price_discount: 0,
      bvv_order_id: 0,
      bvv_hinh_thuc_giam_gia: 0,
      did_time: '',
      lai_xe_don: '',
      tre_em: false,
      lock: 1,
      stt_change: 0,
      sdgct_label_full: ''
    }
  }
];

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChuyenDiCuaBan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    console.log('dm', _.find(dataTest, { bvv_number: 1 }));
  }

  render() {
    console.log('dm', this.props.timeChuyenDi);
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={new Date(this.props.timeChuyenDi)}
          onChange={val => {
            this.setState({ currentDate: val.date });
            this.props.saveTimeChuyenDi(val.date);
          }}
        />
        <TabTask />
      </Container>
    );
  }
}

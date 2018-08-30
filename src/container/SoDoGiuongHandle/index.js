import React from 'react';
import { TouchableOpacity, Modal, LayoutAnimation } from 'react-native';
import { Text, View, Button, Card, Container } from 'native-base';
import { connect } from 'react-redux';
import numeral from 'numeral';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import variables from '../../theme/variables/platform';
import styles from '../SoDoGiuong/styles';

@connect(
  state => ({}),
  { ...commonActions },
  (stateProps, dispatchProps, ownProps) => ({
    initialValues: {
      enableReinitialize: true
    },
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  })
)
export default class Filter extends React.PureComponent {
  static propTypes = {
    handleVisible: PropTypes.func,
    setSoDoGiuong: PropTypes.func,
    data: PropTypes.object,
    onChange: PropTypes.func,
    onXuongXe: PropTypes.func
  };

  setVisible(val) {
    this.props.handleVisible(val);
  }

  render() {
    // console.log('info', this.props.inforGiuong);
    const { inforGiuong } = this.props;
    return (
      // <Modal
      //   animationType="slide"
      //   transparent
      //   visible={this.props.visible}
      //   onRequestClose={() => console.log('')}
      // >
      <Container>
        <TouchableOpacity activeOpacity={1} style={styles.modal}>
          {/* <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setVisible(false)}
            >
              <IconIonicons name="ios-arrow-back" size={28} />
            </TouchableOpacity>
          </View> */}
          <Card style={styles.cardView}>
            <Text style={styles.textNormal}>
              Họ và tên: {inforGiuong.bvv_ten_khach_hang_di}
            </Text>
            <Text style={styles.textNormal}>
              Số điện thoại: {inforGiuong.bvv_phone}
            </Text>
            <Text style={styles.textNormal}>
              Điểm đón: {inforGiuong.bvv_diem_don_khach}
            </Text>
            <Text style={styles.textNormal}>
              Điểm trả: {inforGiuong.bvv_diem_tra_khach}
            </Text>
            <Text style={styles.textNormal}>
              Nơi đi & đến: {inforGiuong.bvv_ben_a_ten} -{' '}
              {inforGiuong.bvv_ben_b_ten}
            </Text>
            <Text style={styles.textNormal}>
              Giá vé: {numeral(inforGiuong.bvv_price).format('0,0')} VNĐ
            </Text>
            <Text style={styles.textNormal}>
              Ghi chú: {inforGiuong.bvv_ghi_chu}
            </Text>
          </Card>
          <View style={styles.itemButton}>
            <Button
              disabled={inforGiuong.bvv_status === 11}
              success
              onPress={() => {
                this.props.onLenXe();
                this.setVisible(false);
              }}
              style={{
                ...styles.btn,
                backgroundColor:
                  inforGiuong.bvv_status === 11
                    ? material.colorRefund
                    : variables.btnSuccessBg
              }}
            >
              <Text style={styles.textNormal}>Xác nhận lên xe</Text>
            </Button>

            <Button
              disabled={inforGiuong.bvv_status !== 11}
              onPress={() => {
                this.props.onXuongXe();
                this.setVisible(false);
              }}
              warning
              style={{
                ...styles.btn,
                backgroundColor:
                  inforGiuong.bvv_status !== 11
                    ? material.colorRefund
                    : variables.btnWarningBg
              }}
            >
              <Text style={styles.textNormal}>Xuống xe</Text>
            </Button>
          </View>
          <View style={styles.itemButton}>
            <Button
              // disabled={inforGiuong.bvv_status === 11}
              onPress={() => {
                this.props.onChange();
                this.setVisible(false);
              }}
              primary
              style={{
                ...styles.btn
                // backgroundColor:
                //   inforGiuong.bvv_status === 11
                //     ? material.colorRefund
                //     : variables.btnPrimaryBg
              }}
            >
              <Text style={styles.textNormal}>Chỉnh sửa</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.onRemoveGhe();
                this.setVisible(false);
              }}
              info
              style={styles.btn}
            >
              <Text style={styles.textNormal}>Chuyển chỗ</Text>
            </Button>
          </View>
          <View style={styles.itemButton}>
            <Button
              onPress={() => {
                this.props.onThemVe();
                this.setVisible(false);
              }}
              success
              style={styles.btn}
            >
              <Text style={styles.textNormal}>Thêm vé</Text>
            </Button>
            <Button
              disabled={inforGiuong.bvv_status === 11}
              onPress={() => {
                this.props.onChuyenCho();
                this.setVisible(false);
              }}
              warning
              style={{
                ...styles.btn,
                backgroundColor:
                  inforGiuong.bvv_status === 11
                    ? material.colorRefund
                    : variables.btnWarningBg
              }}
            >
              <Text style={styles.textNormal}>Chuyển chờ</Text>
            </Button>
          </View>

          <Button
            disabled={inforGiuong.bvv_status === 11}
            onPress={() => {
              this.props.onHuyVe();
              this.setVisible(false);
            }}
            danger
            style={{
              ...styles.btn,
              width: '100%',
              marginTop: material.paddingSmall,
              backgroundColor:
                inforGiuong.bvv_status === 11
                  ? material.colorRefund
                  : variables.btnDangerBg
            }}
          >
            <Text style={styles.textNormal}>Huỷ vé</Text>
          </Button>
        </TouchableOpacity>
        {/* </Modal> */}
      </Container>
    );
  }
}

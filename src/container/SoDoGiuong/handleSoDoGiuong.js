import React from 'react';
import { TouchableOpacity, Modal, LayoutAnimation } from 'react-native';
import { Text, View, Button } from 'native-base';
import { connect } from 'react-redux';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import styles from './styles';

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
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => console.log('')}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setVisible(false)}
            >
              <IconIonicons name="ios-arrow-back" size={28} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textNormal}>
              Họ và tên: {inforGiuong.bvv_ten_khach_hang}
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
            <Text style={styles.textNormal}>Nơi đi & đến: </Text>
            <Text style={styles.textNormal}>
              Giá vé: {inforGiuong.bvv_price}
            </Text>
            <Text style={styles.textNormal}>
              Ghi chú: {inforGiuong.bvv_ghi_chu}
            </Text>
          </View>
          <Button
            success
            onPress={() => {
              this.props.onLenXe();
              this.setVisible(false);
            }}
            style={{ ...styles.btn, marginTop: material.paddingNormal }}
          >
            <Text style={styles.textNormal}>Xác nhận lên xe</Text>
          </Button>
          <Button
            onPress={() => {
              this.props.onXuongXe();
              this.setVisible(false);
            }}
            warning
            style={styles.btn}
          >
            <Text style={styles.textNormal}>Xuống xe</Text>
          </Button>
          <Button
            onPress={() => {
              this.props.onChange();
              this.setVisible(false);
            }}
            primary
            style={styles.btn}
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
            onPress={() => {
              this.props.onChuyenCho();
              this.setVisible(false);
            }}
            warning
            style={styles.btn}
          >
            <Text style={styles.textNormal}>Chuyển chờ</Text>
          </Button>
          <Button
            onPress={() => {
              this.props.onHuyVe();
              this.setVisible(false);
            }}
            danger
            style={styles.btn}
          >
            <Text style={styles.textNormal}>Huỷ vé</Text>
          </Button>
        </TouchableOpacity>
      </Modal>
    );
  }
}

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
    data: PropTypes.object
  };

  setVisible(val) {
    this.props.handleVisible(val);
  }

  render() {
    console.log('info', this.props.inforGiuong);
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
              Họ và tên: {inforGiuong.user.name}
            </Text>
            <Text style={styles.textNormal}>Số điện thoại: {'123456'}</Text>
            <Text style={styles.textNormal}>Điểm đón: </Text>
            <Text style={styles.textNormal}>Điểm trả: </Text>
            <Text style={styles.textNormal}>Nơi đi & đến: </Text>
            <Text style={styles.textNormal}>Giá vé: </Text>
            <Text style={styles.textNormal}>Ghi chú: </Text>
          </View>
          <Button
            success
            style={{ ...styles.btn, marginTop: material.paddingNormal }}
          >
            <Text style={styles.textNormal}>Xác nhận lên xe</Text>
          </Button>
          <Button primary style={styles.btn}>
            <Text style={styles.textNormal}>Chỉnh sửa</Text>
          </Button>
          <Button info style={styles.btn}>
            <Text style={styles.textNormal}>Chuyển chỗ</Text>
          </Button>
          <Button success style={styles.btn}>
            <Text style={styles.textNormal}>Thêm vé</Text>
          </Button>
          <Button danger style={styles.btn}>
            <Text style={styles.textNormal}>Huỷ vé</Text>
          </Button>
          <Button warning style={styles.btn}>
            <Text style={styles.textNormal}>Chuyển chờ</Text>
          </Button>
        </TouchableOpacity>
      </Modal>
    );
  }
}

import React from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import { Text, View } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as commonActions from '../../../store/actions/common';
import material from '../../../theme/variables/material';
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
    setKhuyenMai: PropTypes.func
  };

  setVisible(val) {
    this.props.handleVisible(val);
  }

  itemFilter(value, title, ob) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          ...styles.itemModal,
          borderBottomWidth: value === '3' ? 0 : 1
        }}
        onPress={() => {
          this.props.setKhuyenMai(ob);
          this.setVisible(false);
        }}
      >
        <Text
          style={{
            ...styles.textNormal,
            marginVertical: 2,
            color:
              this.props.status === value
                ? material.primaryColor
                : material.colorRefund
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { t } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => console.log('')}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: 'rgba(0,0,0,.3)',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 10
          }}
          onPress={() => this.setVisible(false)}
        >
          <View style={styles.modal}>
            <View style={{ ...styles.itemModal }}>
              <Text
                style={{
                  ...styles.textNormal,
                  marginVertical: 2,
                  fontWeight: 'normal',
                  color: material.colorRefund,
                  fontSize: material.textTiny
                }}
              >
                {'Chọn loại khuyến mãi'}
              </Text>
            </View>
            {this.itemFilter('1', 'Trẻ em', { id: 1, value: 'Trẻ em' })}
            {this.itemFilter('2', 'Trực tiếp', {
              id: 2,
              value: 'Trực tiếp'
            })}
            {this.itemFilter('3', 'Mã Khuyến Mãi', {
              id: 3,
              value: 'Mã khuyến mãi'
            })}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.itemModalCancel, ...styles.modal }}
            onPress={() => this.setVisible(false)}
          >
            <Text
              style={{
                ...styles.textNormal,
                marginVertical: 2,
                fontWeight: 'bold'
              }}
            >
              {'Huỷ'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}

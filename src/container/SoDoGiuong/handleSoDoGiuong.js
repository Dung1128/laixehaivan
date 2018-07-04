import React from 'react';
import { TouchableOpacity, Modal, LayoutAnimation } from 'react-native';
import { Text, View } from 'native-base';
import { connect } from 'react-redux';
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

  componentWillMount() {
    LayoutAnimation.spring();
  }

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
    console.log('info', this.props.inforGiuong);
    const { inforGiuong } = this.props;
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
            // backgroundColor: 'rgba(0,0,0,.3)',
            backgroundColor: '#fff',
            flex: 1,
            // justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 10
          }}
          onPress={() => this.setVisible(false)}
        >
          <View>
            <Text>{inforGiuong.user.name}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

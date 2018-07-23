import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import Communications from 'react-native-communications';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';

import styles from '../TraKhach/styles';

@connect(
  null,
  { ...commonActions }
)
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    giuong: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    const { data, pending, giuong, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={() => Communications.phonecall(data.bvv_phone_di, true)}
        activeOpacity={0.8}
      >
        <Card style={styles.card}>
          <View>
            <Text style={styles.textNormal}>
              Họ tên:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.bvv_ten_khach_hang_di}
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              SĐT:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.bvv_phone_di}
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              Điểm trả:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.diem_xuong}
              </Text>
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

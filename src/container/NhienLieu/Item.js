import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
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
    onPress: PropTypes.func
  };

  render() {
    const { data, pending, giuong, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8}>
        <Card style={styles.card}>
          <View>
            <Text style={styles.textNormal}>
              Nhà cung cấp:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.nha_cung_cap}
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              Thời gian:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.xad_time}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Số tiền:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {numeral(data.xad_price).format('0,0')} VNĐ
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              Số lít xăng:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.xad_total}
              </Text>
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

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
    giuong: PropTypes.string,
    onPress: PropTypes.func,
    requestVe: PropTypes.func
  };

  render() {
    const { data, pending, giuong, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8}>
        <Card style={styles.card}>
          <View>
            <Text style={styles.textNormal}>
              Họ tên:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.fullname}
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              SĐT:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.phone}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Giường:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.soGhe}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Giá vé:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {numeral(data.price).format('0,0')} VNĐ
              </Text>
            </Text>
          </View>
          <Button
            activeOpacity={0.8}
            onPress={() => this.props.requestVe(data)}
            success
          >
            <Text>Xếp chỗ</Text>
          </Button>
        </Card>
      </TouchableOpacity>
    );
  }
}

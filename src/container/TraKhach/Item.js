import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';

import styles from './styles';

@connect(
  null,
  { ...commonActions }
)
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    pending: PropTypes.bool
  };

  render() {
    const { data, onPress, pending } = this.props;

    return (
      <TouchableOpacity activeOpacity={1}>
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
              Giường:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.ghe}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Điểm trả:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.diem_xuong}
              </Text>
            </Text>
          </View>
          {!pending && (
            <Button onPress={onPress} success>
              <Text>Xuống xe</Text>
            </Button>
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

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
                {data.ghe || data.sdgct_label_full}
              </Text>
            </Text>

            {pending && (
              <View>
                <Text style={styles.textNormal}>
                  Seri vé:{' '}
                  <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                    {data.bvv_seri}
                  </Text>
                </Text>
                <Text style={styles.textNormal}>
                  Ghi chú:{' '}
                  <Text style={styles.textNormal}>{data.bvv_ghi_chu}</Text>
                </Text>
              </View>
            )}
            {!pending ? (
              <Text style={styles.textNormal}>
                Điểm trả:{' '}
                <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                  {data.diem_xuong}
                </Text>
              </Text>
            ) : (
              <View>
                <Text style={styles.textNormal}>
                  Điểm đón:{' '}
                  <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                    {data.bvv_diem_don_khach.toString() !== ''
                      ? data.bvv_diem_don_khach.toString()
                      : data.ben_a}
                  </Text>
                </Text>
                <Text style={styles.textNormal}>
                  Điểm trả:{' '}
                  <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                    {data.bvv_diem_tra_khach.toString() !== ''
                      ? data.bvv_diem_tra_khach.toString()
                      : data.ben_b}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {!pending ? (
            <Button style={styles.btn} onPress={onPress}>
              <Text style={styles.textButton}>Xuống xe</Text>
            </Button>
          ) : (
            <Text style={styles.textNormal}>{this.props.index + 1}</Text>
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

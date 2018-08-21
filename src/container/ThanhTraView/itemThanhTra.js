import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import * as haivanActions from '../../store/actions/haivan';

import styles from '../ChuyenDiCuaBan/styles';

@connect(
  null,
  { ...commonActions, ...haivanActions }
)
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data, detail, styleChuyenDi, logo } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.props.forwardTo('thanhTraDetail', { data: data })}
        activeOpacity={0.8}
      >
        <Card
          style={{
            ...styles.card,
            backgroundColor: styleChuyenDi
          }}
        >
          <View style={{ flex: 2.5 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={{
                  ...styles.textNormal,
                  fontWeight: 'bold',
                  color: 'green'
                }}
              >
                {data.tuy_ten}
              </Text>
            </View>

            <Text style={styles.textNormal}>
              Biển kiểm soát:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.xe_bien_kiem_soat}
              </Text>
            </Text>

            <Text style={styles.textNormal}>
              Lái xe 1:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.lai_xe_1}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Lái xe 2:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.lai_xe_2}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Tiếp viên:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.tiep_vien}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Điểm kiểm tra:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.xtt_dia_diem}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Lỗi:{' '}
              <Text
                style={{
                  ...styles.textNormal,
                  fontWeight: 'bold',
                  color: material.colorAccept
                }}
              >
                {data.nhom_loi}
              </Text>
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

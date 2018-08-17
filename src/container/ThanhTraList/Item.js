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
        activeOpacity={0.8}
        onPress={() => {
          this.props.saveChuyenDi(data.did_id);
          this.props.saveThanhTraData(data);
          this.props.forwardTo('thanhTraView');
        }}
      >
        <Card
          style={{
            ...styles.card,
            backgroundColor: styleChuyenDi
          }}
        >
          <View style={{ flex: 2.5 }}>
            <Text style={styles.textNormal}>
              {data.did_gio_xuat_ben_that} -> {data.did_gio_dieu_hanh}
            </Text>

            <Text style={styles.textNormal}>
              Biển kiểm soát:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.bien_kiem_soat}
              </Text>
            </Text>
            <Text style={styles.textNormal}>{data.tuy_ten}</Text>

            <Text style={styles.textNormal}>
              Lái xe 1:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.laixe1}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Lái xe 2:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.laixe2}
              </Text>
            </Text>
            <Text style={styles.textNormal}>
              Tiếp viên:{' '}
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.tiepvien}
              </Text>
            </Text>
          </View>
          {logo && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image
                source={{
                  uri: data.urlImg
                }}
                style={styles.drawerImage}
              />
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

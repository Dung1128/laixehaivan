import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import * as haivanActions from '../../store/actions/haivan';

import styles from './styles';

@connect(
  null,
  { ...commonActions, ...haivanActions }
)
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    detail: PropTypes.bool
  };

  render() {
    const { data, detail } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          this.props.saveChuyenDi(data.did_id);
          !this.props.lichdieuhanh && this.props.forwardTo('soDoGiuong');
          this.props.bangdieudo && this.props.forwardTo('addBangDieuDo');
        }}
      >
        <Card style={styles.card}>
          {detail && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.tuy_ten}
              </Text>
              <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                {data.did_gio_xuat_ben_that} - {data.did_gio_dieu_hanh}
              </Text>
            </View>
          )}
          {!detail && (
            <Text style={styles.textNormal}>
              {data.did_gio_xuat_ben_that} -> {data.did_gio_dieu_hanh}
            </Text>
          )}

          <Text style={styles.textNormal}>
            Biển kiểm soát:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.bien_kiem_soat}
            </Text>
          </Text>
          {!detail && <Text style={styles.textNormal}>{data.tuy_ten}</Text>}

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
          {detail && (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textNormal}>
                  Đã đặt:{' '}
                  <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                    {data.did_so_cho_da_ban}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...styles.textNormal,
                    marginLeft: material.paddingNormal
                  }}
                >
                  Còn trống:{' '}
                  <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
                    {data.tong_so_cho - data.did_so_cho_da_ban}/{
                      data.tong_so_cho
                    }
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: material.paddingSmall
                }}
              >
                <View style={styles.rowNote}>
                  <View style={styles.note} />
                  <Text
                    style={{
                      ...styles.textNormal,
                      marginLeft: material.paddingSmall
                    }}
                  >
                    Đã lên xe{' '}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.rowNote,
                    marginLeft: material.paddingNormal
                  }}
                >
                  <View
                    style={{
                      ...styles.note,
                      backgroundColor: material.colorRequest
                    }}
                  />
                  <Text
                    style={{
                      ...styles.textNormal,
                      marginLeft: material.paddingSmall
                    }}
                  >
                    Đã book
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.rowNote,
                    marginLeft: material.paddingNormal
                  }}
                >
                  <View
                    style={{
                      ...styles.note,
                      backgroundColor: material.segmentBackgroundColor
                    }}
                  />
                  <Text
                    style={{
                      ...styles.textNormal,
                      marginLeft: material.paddingSmall
                    }}
                  >
                    Vé offline
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

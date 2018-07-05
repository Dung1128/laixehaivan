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

import styles from './styles';

@connect(
  null,
  { ...commonActions }
)
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    detail: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data, detail } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          !this.props.lichdieuhanh && this.props.forwardTo('soDoGiuong');
          this.props.bangdieudo && this.props.forwardTo('addBangDieuDo');
        }}
      >
        <Card style={styles.card}>
          {detail && (
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.address1} -> {data.address2} {data.time}
            </Text>
          )}
          {!detail && <Text style={styles.textNormal}>{data.time}</Text>}

          <Text style={styles.textNormal}>
            Biển kiểm soát:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.bks}
            </Text>
          </Text>
          {!detail && (
            <Text style={styles.textNormal}>
              {data.address1} -> {data.address2}
            </Text>
          )}

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
                    {data.dadat}
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
                    {data.trong}/{data.max}
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
              </View>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  }
}

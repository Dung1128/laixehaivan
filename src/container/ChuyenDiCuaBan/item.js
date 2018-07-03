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
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.props.forwardTo('soDoGiuong')}
      >
        <Card style={styles.card}>
          <Text style={styles.textNormal}>{data.time}</Text>
          <Text style={styles.textNormal}>
            Biển kiểm soát:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.bks}
            </Text>
          </Text>
          <Text style={styles.textNormal}>
            {data.address1} -> {data.address2}
          </Text>
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
        </Card>
      </TouchableOpacity>
    );
  }
}

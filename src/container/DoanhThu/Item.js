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
    pending: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data, pending } = this.props;

    return (
      <Card style={styles.card}>
        <View>
          <Text style={styles.textNormal}>
            Họ tên:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.name}
            </Text>
          </Text>

          <Text style={styles.textNormal}>
            SĐT:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.sdt}
            </Text>
          </Text>
          <Text style={styles.textNormal}>
            Giường:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.giuong}
            </Text>
          </Text>
          <Text style={styles.textNormal}>
            Điểm đi:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.address}
            </Text>
          </Text>
          <Text style={styles.textNormal}>
            Giá:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {data.price}
            </Text>
          </Text>
        </View>
      </Card>
    );
  }
}

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
import data from './data';
import styles from './styles';

@connect(
  null,
  { ...commonActions }
)
export default class ItemGiuong extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }
  renderRowItem(width, item) {
    const w =
      width % 2 === 0
        ? material.deviceWidth / (width + 1) - 20
        : material.deviceWidth / width - 20;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {item.map(item => (
          <View
            style={{
              ...styles.itemRow,
              width: w,
              marginVertical: 2,
              height: 120
            }}
          >
            <Text>
              {item.name}
              {item.id}
            </Text>
            <Text>{item.price}</Text>
          </View>
        ))}
      </View>
    );
  }

  renderItem(data, index) {
    return (
      data.length !== 0 && (
        <Card style={styles.card}>
          {index !== 1 &&
            (index !== 3 && (
              <Text style={styles.textNormal}>
                {index === 4
                  ? 'Ghế sàn'
                  : `Tầng: ${index === 0 ? index + 1 : index}`}
              </Text>
            ))}
          {data.map((item, index) => this.renderRowItem(item.length, item))}
        </Card>
      )
    );
  }

  render() {
    const { data } = this.props;

    return (
      <View>{data.map((item, index) => this.renderItem(item, index))}</View>
    );
  }
}

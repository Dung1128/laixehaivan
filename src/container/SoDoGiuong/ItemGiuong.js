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
    data: PropTypes.array.isRequired,
    handleSoDo: PropTypes.func
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
        {item.data.map(item => (
          <TouchableOpacity
            onPress={() =>
              !item.book
                ? this.props.forwardTo('themVe')
                : this.props.handleSoDo(item)
            }
            activeOpacity={0.6}
            style={{
              ...styles.itemRow,
              width: w,
              backgroundColor:
                item.book === true ? material.colorRequest : material.badgeColor
            }}
          >
            <Text>
              {item.sdgct_label_full}
              {/* {item.id} */}
            </Text>
            {/* <Text>{item.price}</Text> */}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  renderItem(data, index) {
    return (
      data.data.length !== 0 && (
        <Card style={styles.card}>
          {index !== 1 &&
            (index !== 4 && (
              <Text style={styles.textNormal}>
                {index === 3
                  ? 'Ghế sàn'
                  : `Tầng: ${index === 0 ? index + 1 : index}`}
              </Text>
            ))}
          {data.data.map((item, index) =>
            this.renderRowItem(item.data.length, item)
          )}
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

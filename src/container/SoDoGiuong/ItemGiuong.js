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
export default class ItemGiuong extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    handleSoDo: PropTypes.func,
    dataVe: PropTypes.array,
    onPress: PropTypes.func
  };

  checkVe(value) {
    if (!!_.find(this.props.dataVe, { bvv_number: value })) {
      const ve = _.find(this.props.dataVe, { bvv_number: value });
      // console.log(
      //   'status',
      //   _.find(this.props.dataVe, { bvv_number: value }).arrVe.bvv_status
      // );
      if (ve.arrVe.bvv_status !== 0) {
        return { backgroundColor: material.colorRequest };
      } else {
        if (ve.arrVe.lock === 1) {
          return { backgroundColor: material.colorSubtitle };
        }

        if (ve.arrVe.bvv_status === 11) {
          return { backgroundColor: material.colorPending };
        }

        return { backgroundColor: material.badgeColor };
      }
    }
  }

  renderRowItem(width, item) {
    // const showVe = !!_.find(this.props.dataVe, {
    //   bvv_number: item.sdgct_number
    // });

    const w =
      width % 2 === 0
        ? material.deviceWidth / (width + 1) - 20
        : material.deviceWidth / width - 20;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {item.data.map(item => (
          <TouchableOpacity
            onPress={() =>
              this.props.onPress(
                _.find(this.props.dataVe, { bvv_number: item.sdgct_number })
              )
            }
            activeOpacity={0.6}
            style={{
              ...styles.itemRow,
              width: w,
              ...this.checkVe(item.sdgct_number)
            }}
          >
            <Text>
              {item.sdgct_label_full}
              {/* {item.id} */}
            </Text>
            {!!_.find(this.props.dataVe, {
              bvv_number: item.sdgct_number
            }) && (
              <View>
                <Text>
                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }).arrVe.bvv_price / 1000}K
                </Text>
                <Text numberOfLines={1}>
                  {
                    _.find(this.props.dataVe, {
                      bvv_number: item.sdgct_number
                    }).arrVe.bvv_ten_khach_hang
                  }
                </Text>
              </View>
            )}
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
    const { data, dataVe } = this.props;
    // console.log('data', data);
    // console.log('dataVe', dataVe);

    return (
      <View>{data.map((item, index) => this.renderItem(item, index))}</View>
    );
  }
}

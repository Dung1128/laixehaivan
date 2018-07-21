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
    onPress: PropTypes.func,
    price: PropTypes.object,
    dataActive: PropTypes.object
  };

  checkVe(value, sdgct_label) {
    if (!!_.find(this.props.dataVe, { bvv_number: value })) {
      const ve = _.find(this.props.dataVe, { bvv_number: value });
      // console.log(
      //   sdgct_label,
      //   _.find(this.props.dataVe, { bvv_number: value })
      // );
      if (ve.arrVe.bvv_status !== 0) {
        if (ve.arrVe.lock === 1) {
          return { backgroundColor: material.colorSubtitle };
        }

        if (ve.arrVe.bvv_status === 11) {
          return { backgroundColor: material.colorPending };
        }

        if (ve.arrVe.bvv_status === 4) {
          return { backgroundColor: material.inputSuccessBorderColor };
        }
        return { backgroundColor: material.colorRequest };
      } else {
        return { backgroundColor: material.badgeColor };
      }
    }
  }

  itemActive(data) {
    if (data === this.props.dataActive.bvv_number) {
      return { borderColor: material.colorRequest };
    }
    return { borderColor: material.colorBorder };
  }

  checkLockColor(data) {
    if (_.find(this.props.dataVe, { bvv_number: data }).arrVe.lock) {
      return { backgroundColor: material.colorBorder };
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
            disabled={
              _.find(this.props.dataVe, { bvv_number: item.sdgct_number }).arrVe
                .lock
            }
            onPress={() =>
              this.props.onPress(
                _.find(this.props.dataVe, { bvv_number: item.sdgct_number })
              )
            }
            activeOpacity={0.6}
            style={{
              ...styles.itemRow,
              width: w,
              ...this.checkVe(item.sdgct_number, item.sdgct_label),
              ...this.itemActive(item.sdgct_number),
              ...this.checkLockColor(item.sdgct_number)
            }}
          >
            <Text>
              {item.sdgct_label_full}
              {/* {item.id} */}
            </Text>
            {this.props.price ? (
              _.find(this.props.dataVe, {
                bvv_number: item.sdgct_number
              }).arrVe.bvv_price === 0 && (
                <Text>
                  {this.props.price.price > 1000
                    ? this.props.price.price / 1000
                    : this.props.price.price}K
                </Text>
              )
            ) : (
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
            {!!_.find(this.props.dataVe, {
              bvv_number: item.sdgct_number
            }) &&
              _.find(this.props.dataVe, {
                bvv_number: item.sdgct_number
              }).arrVe.bvv_price !== 0 && (
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

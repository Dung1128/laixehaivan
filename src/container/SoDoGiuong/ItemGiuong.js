import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Card } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
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
          return { backgroundColor: material.daLenXe };
        }

        if (ve.arrVe.bvv_status === 1) {
          return { backgroundColor: material.brandWarning };
        }

        if (ve.arrVe.bvv_status === 4) {
          return { backgroundColor: material.inputSuccessBorderColor };
        }
        return { backgroundColor: material.daBook };
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

  checkVeOffline(data, item) {
    // console.log('dmm', this.props.dataOffline);
    if (
      _.find(this.props.dataVe, { bvv_number: data }).arrVe.bvv_status === 0 &&
      _.find(this.props.dataOffline, { bvv_number: data }) &&
      _.find(this.props.dataOffline, { bvv_number: data }).did_id ===
        this.props.did
    ) {
      return { backgroundColor: material.segmentBackgroundColor };
    }
  }

  renderRowItem(width, item) {
    // const showVe = !!_.find(this.props.dataVe, {
    //   bvv_number: item.sdgct_number
    // });

    // console.log('dmm', item);

    const w =
      width % 2 === 0
        ? material.deviceWidth / (width + 1) - 10
        : material.deviceWidth / width - 10;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {item.data.map(item => (
          <TouchableOpacity
            disabled={
              _.find(this.props.dataVe, { bvv_number: item.sdgct_number }).arrVe
                .lock
            }
            onPress={() =>
              !!_.find(this.props.dataOffline, {
                bvv_number: item.sdgct_number
              })
                ? _.find(this.props.dataOffline, {
                    bvv_number: item.sdgct_number
                  }).did_id === this.props.did
                  ? this.props.onCreate(
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      })
                    )
                  : this.props.onPress(
                      _.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      })
                    )
                : this.props.onPress(
                    _.find(this.props.dataVe, {
                      bvv_number: item.sdgct_number
                    })
                  )
            }
            activeOpacity={0.6}
            style={{
              ...styles.itemRow,
              width: w,
              ...this.checkVe(item.sdgct_number, item.sdgct_label),
              ...this.checkVeOffline(item.sdgct_number, item),
              ...this.itemActive(item.sdgct_number),
              ...this.checkLockColor(item.sdgct_number)
            }}
          >
            <View style={styles.headerVe}>
              <View>
                <Text style={styles.textSmall}>{item.sdgct_label_full}</Text>
              </View>
              {/* Giá vé với vé đã được đặt offline ? */}
              {this.props.price ? (
                _.find(this.props.dataVe, {
                  bvv_number: item.sdgct_number
                }).arrVe.bvv_price === 0 &&
                _.find(this.props.dataVe, {
                  bvv_number: item.sdgct_number
                }).arrVe.bvv_status === 0 && (
                  <View>
                    {_.find(this.props.dataOffline, {
                      bvv_number: item.sdgct_number
                    }) &&
                    _.find(this.props.dataOffline, {
                      bvv_number: item.sdgct_number
                    }).did_id === this.props.did ? (
                      <View>
                        <Text numberOfLines={1} style={styles.textSmall}>
                          {_.find(this.props.dataOffline, {
                            bvv_number: item.sdgct_number
                          }).price > 1000
                            ? _.find(this.props.dataOffline, {
                                bvv_number: item.sdgct_number
                              }).price / 1000
                            : _.find(this.props.dataOffline, {
                                bvv_number: item.sdgct_number
                              }).price <= 0
                              ? '???'
                              : _.find(this.props.dataOffline, {
                                  bvv_number: item.sdgct_number
                                }).price}
                          K
                        </Text>
                      </View>
                    ) : (
                      <Text numberOfLines={1} style={styles.textSmall}>
                        {/* Giá cũ với vé đã tính được từ địa điểm ? */}
                        {/* {this.props.price.price > 1000
                          ? this.props.price.price / 1000 + 1
                          : this.props.price.price + 1} */}
                        {/* DM Giá vé linh hoạt check ? */}
                        {_.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }) &&
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.arrGVLH.bvop_hinh_thuc === 1
                          ? this.props.price.price > 1000
                            ? Math.floor(
                                Math.floor(
                                  this.props.price.price -
                                    (this.props.price.price *
                                      _.find(this.props.dataVe, {
                                        bvv_number: item.sdgct_number
                                      }).arrVe.arrGVLH.bvop_phan_tram) /
                                      100
                                ) / 5000
                              ) * 5
                            : Math.floor(
                                Math.floor(
                                  this.props.price.price -
                                    (this.props.price.price *
                                      _.find(this.props.dataVe, {
                                        bvv_number: item.sdgct_number
                                      }).arrVe.arrGVLH.bvop_phan_tram) /
                                      100
                                ) / 5000
                              )
                          : this.props.price.price > 1000
                            ? Math.floor(
                                (this.props.price.price -
                                  _.find(this.props.dataVe, {
                                    bvv_number: item.sdgct_number
                                  }).arrVe.arrGVLH.bvop_tien_mat) /
                                  5000
                              ) * 5
                            : this.props.price.price -
                              _.find(this.props.dataVe, {
                                bvv_number: item.sdgct_number
                              }).arrVe.arrGVLH.bvop_tien_mat}
                        K
                      </Text>
                    )}
                  </View>
                )
              ) : (
                <View>
                  <Text style={styles.textSmall} numberOfLines={1}>
                    {_.find(this.props.dataVe, {
                      bvv_number: item.sdgct_number
                    }).arrVe.bvv_price / 1000}
                    K
                  </Text>
                  <Text style={styles.textSmall} numberOfLines={1}>
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
                }).arrVe.bvv_status !== 0 && (
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {_.find(this.props.dataVe, {
                      bvv_number: item.sdgct_number
                    }).arrVe.bvv_price / 1000}
                    K
                  </Text>
                )}
            </View>

            {this.props.price &&
              _.find(this.props.dataVe, {
                bvv_number: item.sdgct_number
              }).arrVe.bvv_price === 0 &&
              _.find(this.props.dataOffline, {
                bvv_number: item.sdgct_number
              }) &&
              _.find(this.props.dataOffline, {
                bvv_number: item.sdgct_number
              }).did_id === this.props.did && (
                <View>
                  <Text style={styles.textSmall} numberOfLines={1}>
                    {
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      }).phone
                    }
                  </Text>
                  <Text style={styles.textSmall} numberOfLines={1}>
                    {
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      }).diem_tra
                    }
                    {_.find(this.props.dataOffline, {
                      bvv_number: item.sdgct_number
                    }).diem_tra.toString() !== '' && ' - '}
                    {
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      }).diem_don
                    }
                  </Text>

                  <Text style={styles.textSmall} numberOfLines={1}>
                    {_.find(this.props.dataOffline, {
                      bvv_number: item.sdgct_number
                    }).ghi_chu.toString() !== '' && 'Ghi chú: '}

                    {
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      }).ghi_chu
                    }
                  </Text>

                  <Text style={styles.textSmall} numberOfLines={1}>
                    {
                      _.find(this.props.dataOffline, {
                        bvv_number: item.sdgct_number
                      }).fullname
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
                  <Text
                    style={{ ...styles.textSmall, fontWeight: 'bold' }}
                    numberOfLines={1}
                  >
                    {
                      _.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_phone_di
                    }
                  </Text>
                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }).arrVe.bvv_danh_muc.toString() !== '' && (
                    <Text style={styles.textSmall}>
                      Seri:{' '}
                      {
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_danh_muc
                      }{' '}
                      /{' '}
                      {
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_seri
                      }
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }) && (
                    <Text style={styles.textSmall}>
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ben_a_ma.toString()}{' '}
                      -{' '}
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ben_b_ma.toString()}
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }) && (
                    <Text numberOfLines={2} style={styles.textSmall}>
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_diem_don_khach.toString() !== '' &&
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_diem_don_khach.toString() + ' -'}{' '}
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_diem_tra_khach.toString()}
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }).arrVe.bvv_ghi_chu.toString() !== '' && (
                    <Text style={styles.textSmall}>
                      Ghi chú:
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ghi_chu.toString()}
                    </Text>
                  )}

                  <Text
                    style={{ ...styles.textSmall, fontWeight: 'bold' }}
                    numberOfLines={1}
                  >
                    {
                      _.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ten_khach_hang_di
                    }
                  </Text>
                </View>
              )}

            {!!_.find(this.props.dataVe, {
              bvv_number: item.sdgct_number
            }) &&
              _.find(this.props.dataVe, {
                bvv_number: item.sdgct_number
              }).arrVe.bvv_price === 0 &&
              _.find(this.props.dataVe, {
                bvv_number: item.sdgct_number
              }).arrVe.bvv_status !== 0 && (
                <View>
                  <Text
                    style={{ ...styles.textSmall, fontWeight: 'bold' }}
                    numberOfLines={1}
                  >
                    {
                      _.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_phone_di
                    }
                  </Text>
                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }).arrVe.bvv_danh_muc.toString() !== '' && (
                    <Text style={styles.textSmall}>
                      Seri:{' '}
                      {
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_danh_muc
                      }{' '}
                      /{' '}
                      {
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_seri
                      }
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }) && (
                    <Text style={styles.textSmall}>
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ben_a_ma.toString()}{' '}
                      -{' '}
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ben_b_ma.toString()}
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }) && (
                    <Text numberOfLines={2} style={styles.textSmall}>
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_diem_don_khach.toString() !== '' &&
                        _.find(this.props.dataVe, {
                          bvv_number: item.sdgct_number
                        }).arrVe.bvv_diem_don_khach.toString() + ' -'}{' '}
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_diem_tra_khach.toString()}
                    </Text>
                  )}

                  {_.find(this.props.dataVe, {
                    bvv_number: item.sdgct_number
                  }).arrVe.bvv_ghi_chu.toString() !== '' && (
                    <Text style={styles.textSmall}>
                      Ghi chú:
                      {_.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ghi_chu.toString()}
                    </Text>
                  )}

                  <Text
                    style={{ ...styles.textSmall, fontWeight: 'bold' }}
                    numberOfLines={1}
                  >
                    {
                      _.find(this.props.dataVe, {
                        bvv_number: item.sdgct_number
                      }).arrVe.bvv_ten_khach_hang_di
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
    // console.log('data', data);
    return (
      data.data.length !== 0 && (
        <View style={styles.card}>
          {index !== 1 &&
            (index !== 3 && (
              <Text style={styles.textNormal}>
                {index === 4
                  ? 'Ghế sàn'
                  : `Tầng: ${index === 0 ? index + 1 : index}`}
              </Text>
            ))}
          {data.data.map((item, index) =>
            this.renderRowItem(item.data.length, item)
          )}
        </View>
      )
    );
  }

  render() {
    const { data, dataVe, dataOffline } = this.props;
    // console.log('data offline', dataOffline);
    // console.log('dataVe', dataVe);
    // console.log('DATA', this.props.data);

    return (
      <View>{data.map((item, index) => this.renderItem(item, index))}</View>
    );
  }
}

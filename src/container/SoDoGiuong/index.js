import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Fab,
  Card,
  View
} from 'native-base';
import { connect } from 'react-redux';
import FabButton from '../../components/FabButton';

import ItemGiuong from './ItemGiuong';
import material from '../../theme/variables/material';
import ItemChuyenDi from '../ChuyenDiCuaBan/item';
import HandleSoDoGiuong from './handleSoDoGiuong';

import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import styles from '../ChuyenDiCuaBan/styles';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    ve: haivanSelectors.getVe(state).arrVe,
    getActionXepCho: haivanSelectors.actionXepCho(state),
    getActionRemoveGhe: haivanSelectors.actionRemoveGhe(state),
    getActionThemVe: haivanSelectors.actionThemVe(state),
    getUpdateSDG: haivanSelectors.UpdateSDG(state),
    getConnect: haivanSelectors.saveConnect(state),
    getDataOffline: haivanSelectors.dataOffline(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class SoDoGiuong extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      visible: false,
      inforGiuong: {
        user: {
          name: '1'
        }
      },
      detailVe: {},
      soDoGiuong: {
        arrChoTang: [],
        arrInfo: {
          data: []
        },
        arrVeNumber: [],
        arrBen: [],
        arrGiaVe: []
      },
      newData: [],
      price: {},
      oldDetailVe: {
        arrVe: {
          bvv_id: 0
        }
      },
      tongSoVe: 0,
      stateOffline: [],
      stateOfflineDif: []
    };
  }

  componentWillMount() {
    let newDataOffline = [];
    let newDataOfflineDif = [];
    this.props.getDataOffline.map((item, index) => {
      if (item.did_id === this.props.did_id) {
        newDataOffline.push(item);
      } else {
        newDataOfflineDif.push(item);
      }
    });
    this.setState({
      stateOffline: newDataOffline,
      stateOfflineDif: newDataOfflineDif
    });
  }

  componentDidMount() {
    this.getList(this.props.did_id, this.props.getDataOffline);
    // this.danhMucVe(this.props.did_id);
  }

  getList(did_id, dataOff) {
    this.countOffline = 0;
    this.countVe = 0;
    const newData = [];
    console.log('data Off', dataOff);

    dataOff.map(item => {
      if (item.did_id === did_id) {
        this.countOffline += 1;
      }
    });

    const params = {
      token: this.props.token,
      did_id: did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getSoDoGiuong(params, (e, d) => {
      if (d) {
        const newArray = [];
        newArray.push(d.arrChoTang[0]);
        newArray.push(d.arrChoTang[2]);
        newArray.push(d.arrChoTang[1]);
        newArray.push(d.arrChoTang[3]);
        newArray.push(d.arrChoTang[4]);
        this.setState({ soDoGiuong: d, newData: newArray }, () => {
          // console.log(
          //   'haiz',
          //   _.find(this.state.soDoGiuong.arrGiaVe, {
          //     diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
          //   });

          // console.log('arrInfo', this.state.soDoGiuong.arrInfo);

          // console.log(
          //   'priceeeee',
          //   _.find(
          //     _.find(this.state.soDoGiuong.arrGiaVe, {
          //       diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
          //     }).data,
          //     {
          //       diem_b: this.state.soDoGiuong.arrInfo.tuy_ben_b
          //     }
          //   )
          // );

          d.arrVeNumber.map(item => {
            if (item.arrVe.bvv_status !== 0) {
              this.countVe += 1;
            }
          });

          if (
            _.find(
              _.find(this.state.soDoGiuong.arrGiaVe, {
                diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
              })
            )
          ) {
            if (
              _.find(
                _.find(this.state.soDoGiuong.arrGiaVe, {
                  diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
                }).data,
                {
                  diem_b: this.state.soDoGiuong.arrInfo.tuy_ben_b
                }
              )
            ) {
              this.setState({
                price: _.find(
                  _.find(this.state.soDoGiuong.arrGiaVe, {
                    diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
                  }).data,
                  {
                    diem_b: this.state.soDoGiuong.arrInfo.tuy_ben_b
                  }
                )
              });
            }
          }

          this.setState({
            // price: _.find(
            //   _.find(this.state.soDoGiuong.arrGiaVe, {
            //     diem_a: this.state.soDoGiuong.arrInfo.tuy_ben_a
            //   }).data,
            //   {
            //     diem_b: this.state.soDoGiuong.arrInfo.tuy_ben_b
            //   }
            // ),
            tongSoVe: this.countVe + this.countOffline
          });
        });
      }
    });
  }

  xuongXe() {
    const params = {
      token: this.props.token,
      bvv_id: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.xuongXe(params, (e, d) => {
      if (d) {
        this.getList(this.props.did_id, this.props.getDataOffline);
      }

      if (e && e.message) {
        this.props.setToast(e.message.message, 'error');
      }
    });
  }

  lenXe() {
    const params = {
      token: this.props.token,
      bvv_id: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.lenXe(params, () =>
      this.getList(this.props.did_id, this.props.getDataOffline)
    );
  }

  chuyenCho() {
    const params = {
      token: this.props.token,
      bvv_id_can_chuyen: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id
    };
    this.props.chuyenCho(params, () =>
      this.getList(this.props.did_id, this.props.getDataOffline)
    );
  }

  huyve() {
    const params = {
      token: this.props.token,
      bvv_id: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.huyVe(params, () =>
      this.getList(this.props.did_id, this.props.getDataOffline)
    );
  }

  checkSuDungVe(val) {
    const params = {
      token: this.props.token,
      bvv_id: val.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id,
      bvv_number: val.bvv_number
    };

    this.props.getConnect
      ? this.props.checkSuDungVe(params, (e, d) => {
          if (d && d.message === 'OK') {
            this.props.forwardTo('themVe', {
              data: this.state.soDoGiuong.arrBen,
              dataGiaVe: this.state.soDoGiuong.arrGiaVe,
              arrVeNumber: this.state.soDoGiuong.arrVeNumber,
              detailVe: val,
              infoChuyen: this.state.soDoGiuong.arrInfo
            });
          }
          if (d && d.message !== 'OK') {
            this.props.setToast(d.message);
            this.getList(this.props.did_id, this.props.getDataOffline);
          }

          if (e && e.message) {
            this.props.setToast(e.message.message);
            this.getList(this.props.did_id, this.props.getDataOffline);
          }
        })
      : this.props.forwardTo('themVe', {
          data: this.state.soDoGiuong.arrBen,
          dataGiaVe: this.state.soDoGiuong.arrGiaVe,
          arrVeNumber: this.state.soDoGiuong.arrVeNumber,
          detailVe: val,
          infoChuyen: this.state.soDoGiuong.arrInfo
        });
  }

  xepCho() {
    const params = {
      token: this.props.token,
      bvh_id_can_chuyen: this.props.route.params.dataCho.info.bvh_id,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id,
      bvv_number_muon_chuyen: this.state.detailVe.bvv_number
    };
    this.props.xepChoGheCho(params, (e, d) => {
      if (d) {
        this.props.actionXepCho(false);
        this.getList(this.props.did_id, this.props.getDataOffline);
      }
    });
  }

  doiGhe() {
    // console.log('this.state.oldDetailVe', this.state.oldDetailVe);
    const params = {
      token: this.props.token,
      bvv_id_can_chuyen: this.state.oldDetailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id,
      bvv_number_muon_chuyen: this.state.detailVe.bvv_number,
      diem_a: this.state.oldDetailVe.arrVe.bvv_bex_id_a,
      diem_b: this.state.oldDetailVe.arrVe.bvv_bex_id_b
    };
    this.props.removeGhe(params, (e, d) => {
      if (d) {
        this.props.actionRemoveGhe(false);
        this.getList(this.props.did_id, this.props.getDataOffline);
      } else {
        this.props.actionRemoveGhe(false);
      }
    });
  }

  themVe(newVe) {
    // console.log('them ve');
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      bvv_id1: this.state.oldDetailVe.arrVe.bvv_id,
      bvv_id2: this.state.detailVe.arrVe.bvv_id
    };

    this.props.themVe(
      {
        adm_id: this.props.profile.adm_id,
        token: this.props.token,
        did_id: this.props.did_id,
        bvv_id1: this.state.oldDetailVe.arrVe.bvv_id,
        bvv_id2: newVe.arrVe.bvv_id
      },
      (e, d) => {
        if (d) {
          this.getList(this.props.did_id, this.props.getDataOffline);
        }

        if (e && e.message) {
          this.props.setToast(e.message.message);
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    this.count1 = 0;
    this.count2 = 0;

    if (this.props.did_id !== nextProps.did_id && nextProps.token !== null) {
      this.getList(nextProps.did_id, nextProps.getDataOffline);
      // this.danhMucVe(nextProps.did_id);
    }

    if (
      !nextProps.getConnect &&
      this.props.getDataOffline !== nextProps.getDataOffline
    ) {
      nextProps.getDataOffline.map(item => {
        if (item.did_id === nextProps.did_id) {
          this.count1 += 1;
        }
      });

      this.state.soDoGiuong.arrVeNumber.map(item => {
        if (item.arrVe.bvv_status !== 0) {
          this.count2 += 1;
        }
      });

      this.setState({
        tongSoVe: this.count1 + this.count2
      });
    }
    if (nextProps.token !== null) {
      if (
        this.props.getUpdateSDG !== nextProps.getUpdateSDG ||
        this.props.getDataOffline !== nextProps.getDataOffline
      ) {
        // console.log('nextProps.getDataOffline', nextProps.getDataOffline);
        this.props.getConnect &&
          this.getList(this.props.did_id, nextProps.getDataOffline);
        // this.props.getConnect && this.danhMucVe(this.props.did_id);
      }
    }

    if (
      this.props.getDataOffline !== nextProps.getDataOffline ||
      this.props.did_id !== nextProps.did_id
    ) {
      let newDataOffline = [];
      let newDataOfflineDif = [];
      nextProps.getDataOffline.map((item, index) => {
        if (item.did_id === nextProps.did_id) {
          newDataOffline.push(item);
        } else {
          newDataOfflineDif.push(item);
        }
      });
      this.setState({
        stateOffline: newDataOffline,
        stateOfflineDif: newDataOfflineDif
      });
    }
  }

  onCreate(val) {
    const newData = [];
    Alert.alert(
      'Thông báo',
      'Bạn có đồng bộ vé không?',
      [
        { text: 'Không', onPress: () => {}, style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            this.props.insertVe(val, (e, d) => {
              if (d) {
                this.props.actionUpdateSDG(new Date());

                this.state.stateOffline.map((it, index) => {
                  if (
                    _.findIndex(this.state.stateOffline, {
                      bvv_number: val.bvv_number
                    }) !== index
                  ) {
                    newData.push(it);
                  }
                });
                this.props.subObjOffline([
                  ...newData,
                  ...this.state.stateOfflineDif
                ]);
              }
              if (
                this.props.getConnect &&
                e &&
                e.message.message.toString() ===
                  'Chỗ đã có người đặt. Bạn vui lòng chọn chỗ khác.'
              ) {
                Alert.alert(
                  'Thông báo',
                  'Chỗ đã có người đặt. Bạn vui lòng chọn chỗ khác.'
                );
                // this.danhMucVe(this.props.did_id);

                this.state.stateOffline.map((it, index) => {
                  if (
                    _.findIndex(this.state.stateOffline, {
                      bvv_number: val.bvv_number
                    }) !== index
                  ) {
                    newData.push(it);
                  }
                });
                this.props.subObjOffline([
                  ...newData,
                  ...this.state.stateOfflineDif
                ]);
                this.getList(this.props.did_id, [
                  ...newData,
                  ...this.state.stateOfflineDif
                ]);
              }
              if (!this.props.getConnect) {
                Alert.alert(
                  'Thông báo',
                  'Mạng internet đang không ổn định, vui lòng thử lại sau.'
                );
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { soDoGiuong } = this.setState;

    return (
      <Container style={{ padding: material.paddingSmall }}>
        <Content showsVerticalScrollIndicator={false}>
          <ItemChuyenDi
            styleChuyenDi={'#fff'}
            detail
            data={this.state.soDoGiuong.arrInfo}
            tongSoVe={this.state.tongSoVe}
          />
          {this.state.stateOffline.length > 0 && (
            <Text
              style={{
                ...styles.textSmall,
                paddingHorizontal: material.paddingSmall,
                color: material.colorDeclined,
                fontWeight: 'bold'
              }}
            >
              Vui lòng cập nhật vé offline!
            </Text>
          )}
          {this.state.newData && (
            <ItemGiuong
              onPress={val => {
                this.setState({ detailVe: val });
                this.props.saveVe(val);

                if (this.props.getActionXepCho) {
                  Alert.alert(
                    'Thông báo',
                    'Bạn có muốn xếp vé vào chỗ không?',
                    [
                      { text: 'Không', onPress: () => {}, style: 'cancel' },
                      {
                        text: 'Đồng ý',
                        onPress: () => {
                          this.xepCho();
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                } else if (this.props.getActionRemoveGhe) {
                  Alert.alert(
                    'Thông báo',
                    'Bạn có muốn đổi chỗ không?',
                    [
                      { text: 'Không', onPress: () => {}, style: 'cancel' },
                      {
                        text: 'Đồng ý',
                        onPress: () => {
                          this.doiGhe();
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                } else if (this.props.getActionThemVe) {
                  // Alert.alert(
                  //   'Thông báo',
                  //   'Bạn có muốn thêm vé không?',
                  //   [
                  //     { text: 'Không', onPress: () => {}, style: 'cancel' },
                  //     {
                  //       text: 'Đồng ý',
                  //       onPress: () => {
                  //         this.themVe();
                  //       }
                  //     }
                  //   ],
                  //   { cancelable: false }
                  // );
                  this.setState({ detailVe: val }, () =>
                    this.themVe(this.state.detailVe)
                  );
                  //
                  console.log('them ve');
                } else {
                  val.arrVe.bvv_status !== 0
                    ? this.setState({
                        visible: true,
                        inforGiuong: val
                      })
                    : this.checkSuDungVe(val);
                }
              }}
              onCreate={val => this.onCreate(val)}
              data={this.state.newData}
              dataVe={this.state.soDoGiuong.arrVeNumber}
              price={this.state.price}
              dataActive={this.props.ve}
              dataOffline={this.state.stateOffline}
              did={this.props.did_id}

              // handleSoDo={val =>
              //   this.setState({
              //     inforGiuong: val,
              //     visible: true
              //   })
              // }
            />
          )}
        </Content>
        <FabButton />

        <HandleSoDoGiuong
          onChange={() => {
            this.props.saveVe(this.state.detailVe);
            this.props.forwardTo('themVe', {
              data: this.state.soDoGiuong.arrBen,
              dataGiaVe: this.state.soDoGiuong.arrGiaVe,
              arrVeNumber: this.state.soDoGiuong.arrVeNumber,
              detailVe: this.state.detailVe,
              infoChuyen: this.state.soDoGiuong.arrInfo
            });
          }}
          onXuongXe={() => {
            this.xuongXe();
          }}
          onLenXe={() => {
            this.lenXe();
          }}
          onHuyVe={() => {
            this.huyve();
          }}
          onThemVe={() => {
            this.props.actionThemVe(true);
            this.setState({ oldDetailVe: this.state.detailVe });
          }}
          onChuyenCho={() => this.chuyenCho()}
          onRemoveGhe={() => {
            this.props.actionRemoveGhe(true);
            this.setState({ oldDetailVe: this.state.detailVe });
          }}
          inforGiuong={this.props.ve}
          setSoDoGiuong={ob =>
            this.setState({
              soDoGiuong: ob
            })
          }
          handleVisible={val =>
            this.setState({
              visible: val
            })
          }
          visible={this.state.visible}
        />
        {this.props.getActionThemVe === true && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: material.paddingSmall,
              backgroundColor: 'transparent'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.actionRemoveGhe(false);
                this.props.actionXepCho(false);
                this.props.actionThemVe(false);
              }}
              style={{
                paddingHorizontal: material.paddingNormal,
                paddingVertical: material.paddingSmall + 2,
                backgroundColor: material.colorComplete,
                borderRadius: 8
              }}
              activeOpacity={0.6}
            >
              <Text
                style={{
                  ...styles.textNormal,
                  color: material.badgeColor,
                  fontWeight: 'bold'
                }}
              >
                Hoàn tất thêm vé
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Container>
    );
  }
}

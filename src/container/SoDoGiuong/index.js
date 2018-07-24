import React from 'react';
import { Alert } from 'react-native';
import { Container, Content, Text, Button, Icon, Fab, Card } from 'native-base';
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
      }
    };
  }

  componentDidMount() {
    this.getList();
    this.danhMucVe();
  }

  danhMucVe() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getDanhMucVe(params);
  }

  getList() {
    const newData = [];
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
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
    this.props.xuongXe(params, () => this.getList());
  }

  lenXe() {
    const params = {
      token: this.props.token,
      bvv_id: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.lenXe(params, () => this.getList());
  }

  chuyenCho() {
    const params = {
      token: this.props.token,
      bvv_id_can_chuyen: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id
    };
    this.props.chuyenCho(params, () => this.getList());
  }

  huyve() {
    const params = {
      token: this.props.token,
      bvv_id: this.state.detailVe.arrVe.bvv_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.huyVe(params, () => this.getList());
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
              detailVe: val
            });
          }
          if (d && d.message !== 'OK') {
            this.props.setToast(d.message);
          }
        })
      : this.props.forwardTo('themVe', {
          data: this.state.soDoGiuong.arrBen,
          dataGiaVe: this.state.soDoGiuong.arrGiaVe,
          arrVeNumber: this.state.soDoGiuong.arrVeNumber,
          detailVe: val
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
        this.getList();
      }
    });
  }

  doiGhe() {
    console.log('this.state.oldDetailVe', this.state.oldDetailVe);
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
        this.getList();
      }
    });
  }

  themVe() {
    console.log('them ve');
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
        bvv_id2: this.state.detailVe.arrVe.bvv_id
      },
      (e, d) => {
        if (d) {
          this.getList();
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getUpdateSDG !== this.props.getUpdateSDG) {
      this.getList();
      this.danhMucVe();
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

                this.props.getDataOffline.map((it, index) => {
                  if (
                    _.findIndex(this.props.getDataOffline, {
                      bvv_number: val.bvv_number
                    }) !== index
                  ) {
                    newData.push(it);
                  }
                });
                this.props.subObjOffline(newData);
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
          <ItemChuyenDi detail data={this.state.soDoGiuong.arrInfo} />
          {this.props.getDataOffline.length > 0 && (
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
                  Alert.alert(
                    'Thông báo',
                    'Bạn có muốn thêm vé không?',
                    [
                      { text: 'Không', onPress: () => {}, style: 'cancel' },
                      {
                        text: 'Đồng ý',
                        onPress: () => {
                          this.themVe();
                        }
                      }
                    ],
                    { cancelable: false }
                  );
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
              dataOffline={this.props.getDataOffline}
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
              detailVe: this.state.detailVe
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
      </Container>
    );
  }
}

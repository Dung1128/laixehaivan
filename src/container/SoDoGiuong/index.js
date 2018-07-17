import React from 'react';
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

const infoXe = {
  address1: 'Lương Yên',
  address2: 'Bến xe Lào Cai',
  bks: '24B1324',
  laixe1: 'Nguyễn Văn A',
  laixe2: 'Nguyễn Văn B',
  tiepvien: 'Nguyễn Văn C',
  dadat: 2,
  trong: 42,
  max: 44,
  time: '12:00 -> 14:30',
  type: 2
};

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
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
      soDoGiuong: {
        arrChoTang: [],
        arrInfo: {},
        arrVeNumber: [],
        arrBen: [],
        arrGiaVe: []
      },
      newData: []
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
        this.setState({ soDoGiuong: d, newData: newArray });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.did_id !== nextProps.did_id) {
    // }
  }

  render() {
    const { soDoGiuong } = this.setState;

    return (
      <Container style={{ padding: material.paddingSmall }}>
        <Content showsVerticalScrollIndicator={false}>
          <ItemChuyenDi detail data={this.state.soDoGiuong.arrInfo} />
          {this.state.newData && (
            <ItemGiuong
              onPress={val => {
                console.log('dkm', val);
                val.arrVe.bvv_status !== 0
                  ? this.setState({
                      visible: true,
                      inforGiuong: val
                    })
                  : this.props.forwardTo('themVe', {
                      data: this.state.soDoGiuong.arrBen,
                      dataGiaVe: this.state.soDoGiuong.arrGiaVe,
                      arrVeNumber: this.state.soDoGiuong.arrVeNumber,
                      detailVe: val
                    });
              }}
              data={this.state.newData}
              dataVe={this.state.soDoGiuong.arrVeNumber}
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
          inforGiuong={this.state.inforGiuong}
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

import React from 'react';
import { Container, Content, Text, Button, Icon, Fab, Card } from 'native-base';
import FabButton from '../../components/FabButton';
import data from './data';
import ItemGiuong from './ItemGiuong';
import material from '../../theme/variables/material';
import ItemChuyenDi from '../ChuyenDiCuaBan/item';

const infoXe = {
  address1: 'Lương Yên',
  address2: 'Bến xe Lào Cai',
  bks: '24B1324',
  laixe1: 'Nguyễn Văn A',
  laixe2: 'Nguyễn Văn B',
  tiepvien: 'Nguyễn Văn C',
  dadat: 0,
  trong: 44,
  max: 44,
  time: '12:00 -> 14:30',
  type: 2
};

export default class SoDoGiuong extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    console.log(data);
    return (
      <Container style={{ padding: material.paddingSmall }}>
        <Content showsVerticalScrollIndicator={false}>
          <ItemChuyenDi detail data={infoXe} />
          <ItemGiuong data={data} />
        </Content>
        <FabButton />
      </Container>
    );
  }
}

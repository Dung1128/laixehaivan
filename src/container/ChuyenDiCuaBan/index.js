import React from 'react';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import DateTimePicker from '../../components/DateTimePick';
import material from '../../theme/variables/material';
import { TabTask } from './tabTask';
import ChieuDi from './ChieuDi';
import ChieuVe from './ChieuVe';

const data = [
  {
    time: '05:00 -> 05:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 1
  },
  {
    time: '06:00 -> 06:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 2
  },
  {
    time: '07:00 -> 07:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 1
  },
  {
    time: '08:00 -> 09:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 1
  },
  {
    time: '010:00 -> 11:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 1
  },
  {
    time: '12:00 -> 14:30',
    bks: '24B00912',
    address1: 'Lương Yên',
    address2: 'Lào Cai',
    laixe1: 'Nguyễn Văn A',
    laixe2: 'Nguyễn Văn B',
    tiepvien: 'Nguyễn Văn C',
    type: 2
  }
];

export default class ChuyenDiCuaBan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }
  render() {
    return (
      <Container style={{ paddingHorizontal: material.paddingNormal }}>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
          onChange={val => {
            console.log(val.date);
            this.setState({ currentDate: val.date });
          }}
        />
        <TabTask screenProps={data} />
      </Container>
    );
  }
}

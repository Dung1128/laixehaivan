import React from 'react';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePicker from '../../components/DateTimePick';
import material from '../../theme/variables/material';
import { TabTask } from './tabTask';
import ChieuDi from './ChieuDi';
import ChieuVe from './ChieuVe';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';

const data = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChuyenDiCuaBan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
    console.log(this.props.token);
  }

  componentDidMount() {
    const params = {
      token: this.props.token,
      day: moment(new Date()).format('DD-MM-YYYY'),
      adm_id: this.props.profile.adm_id
    };

    this.props.listChuyenDi(params);
  }

  render() {
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
          onChange={val => {
            this.setState({ currentDate: val.date });
          }}
        />
        <TabTask screenProps={data} />
      </Container>
    );
  }
}

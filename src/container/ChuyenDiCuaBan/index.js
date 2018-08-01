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
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChuyenDiCuaBan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.timeChuyenDi !== this.props.timeChuyenDi &&
      nextProps.token !== null
    ) {
      this.getMenu();
    }
  }

  getMenu() {
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token
    };
    this.props.getMenu(params, (e, d) => {
      if (d && d.arrMenu) {
        this.props.saveMenu(d.arrMenu);
      }
    });
    this.props.forwardTo('chuyenDiCuaBan');
  }

  render() {
    console.log('dm', this.props.timeChuyenDi);
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={new Date(this.props.timeChuyenDi)}
          onChange={val => {
            this.setState({ currentDate: val.date });
            this.props.saveTimeChuyenDi(val.date);
          }}
        />
        <TabTask />
      </Container>
    );
  }
}

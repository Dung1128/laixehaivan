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
    this.state = {};
  }

  render() {
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
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

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, Tabs, Tab, View } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from '../../components/DateTimePick';
import material from '../../theme/variables/material';
import { TabTask } from './tabTask';
import ChieuDi from './ChieuDi';
import ChieuVe from './ChieuVe';
import styles from '../ChuyenDiCuaBan/styles';
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
export default class BangDieuDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      active: true
    };
  }

  componentDidMount() {
    // this.getInfo();
  }

  checkStyle() {
    if (this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyle1() {
    if (!this.state.active) {
      return styles.itemActive;
    }
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
        <View style={styles.styleTab}>
          <TouchableOpacity
            onPress={() =>
              !this.state.active &&
              this.setState({
                active: !this.state.active
              })
            }
            activeOpacity={0.7}
            style={{ ...styles.itemRow, ...this.checkStyle() }}
          >
            <Text>Chiều đi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.state.active &&
              this.setState({
                active: !this.state.active
              })
            }
            activeOpacity={0.7}
            style={{ ...styles.itemRow, ...this.checkStyle1() }}
          >
            <Text>Chiều về</Text>
          </TouchableOpacity>
        </View>
        {this.state.active ? (
          <ChieuDi currentDate={this.state.currentDate} />
        ) : (
          <ChieuVe currentDate={this.state.currentDate} />
        )}
        {/* <TabTask /> */}
      </Container>
    );
  }
}

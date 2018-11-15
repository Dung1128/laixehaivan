import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, Tabs, Tab, View } from 'native-base';
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
import styles from './styles';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChuyenDiCuaBan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      currentDate: new Date()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== null &&
      nextProps.timeChuyenDi !== this.props.timeChuyenDi
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
  }

  checkStyle() {
    if (this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyleText() {
    if (this.state.active) {
      return styles.itemActiveText;
    }
  }

  checkStyle1() {
    if (!this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyleText1() {
    if (!this.state.active) {
      return styles.itemActiveText;
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
            this.props.saveTimeChuyenDi(val.date);
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
            style={{
              ...styles.itemRow,
              ...this.checkStyle(),
              ...styles.borderLeft
            }}
          >
            <Text style={{ ...styles.textNormal, ...this.checkStyleText() }}>
              Chiều đi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.state.active &&
              this.setState({
                active: !this.state.active
              })
            }
            activeOpacity={0.7}
            style={{
              ...styles.itemRow,
              ...this.checkStyle1(),
              ...styles.borderRight
            }}
          >
            <Text style={{ ...styles.textNormal, ...this.checkStyleText1() }}>
              Chiều về
            </Text>
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

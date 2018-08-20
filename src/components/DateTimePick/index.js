import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { connect } from 'react-redux';

import styles from './styles';
import material from '../../theme/variables/material';

@connect(
  state => ({}),
  {}
)
export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    titleDate: this.props.defaultDate
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultDate !== this.props.defaultDate) {
      this.setState({
        titleDate: nextProps.defaultDate
      });
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const { t } = this.props;
    const currentMonth = moment(date).format('MM');

    const newMonth = [
      { id: 1, name: 'Tháng 1', key: '01' },
      { id: 2, name: 'Tháng 2', key: '02' },
      { id: 3, name: 'Tháng 3', key: '03' },
      { id: 4, name: 'Tháng 4', key: '04' },
      { id: 5, name: 'Tháng 5', key: '05' },
      { id: 6, name: 'Tháng 6', key: '06' },
      { id: 7, name: 'Tháng 7', key: '07' },
      { id: 8, name: 'Tháng 8', key: '08' },
      { id: 9, name: 'Tháng 9', key: '09' },
      { id: 10, name: 'Tháng 10', key: '10' },
      { id: 11, name: 'Tháng 11', key: '11' },
      { id: 12, name: 'Tháng 12', key: '12' }
    ].filter(value => value.key === currentMonth);

    this.setState({
      titleDate: date
    });
    this.props.onChange && this.props.onChange({ date, newMonth: newMonth[0] });
    this._hideDateTimePicker();
  };

  render() {
    const { t } = this.props;
    const currentMonth = moment(this.state.titleDate).format('MM');
    const currentYear = moment(this.state.titleDate).format('YYYY');
    const day = moment(this.state.titleDate).format('ll');
    const days = new Date(this.state.titleDate).getDate();
    const newMonth = [
      { id: 1, name: 'Tháng 1', key: '01' },
      { id: 2, name: 'Tháng 2', key: '02' },
      { id: 3, name: 'Tháng 3', key: '03' },
      { id: 4, name: 'Tháng 4', key: '04' },
      { id: 5, name: 'Tháng 5', key: '05' },
      { id: 6, name: 'Tháng 6', key: '06' },
      { id: 7, name: 'Tháng 7', key: '07' },
      { id: 8, name: 'Tháng 8', key: '08' },
      { id: 9, name: 'Tháng 9', key: '09' },
      { id: 10, name: 'Tháng 10', key: '10' },
      { id: 11, name: 'Tháng 11', key: '11' },
      { id: 12, name: 'Tháng 12', key: '12' }
    ].filter(value => value.key === currentMonth);

    return (
      <View style={styles.dropdownContainer}>
        {moment(this.state.titleDate).format('YYYY-MM-DD') ===
        moment(new Date()).format('YYYY-MM-DD') ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this._showDateTimePicker}
            style={styles.dropdownHeader}
          >
            <Text
              style={{
                ...styles.textTitle,
                paddingRight: 8,
                fontSize: material.textBigger
              }}
            >
              {'Ngày hôm nay'}
            </Text>
            <IconIonicons name="md-arrow-dropdown" style={styles.dropdown} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this._showDateTimePicker}
            style={styles.dropdownHeader}
          >
            <Text
              style={{
                ...styles.textTitle,
                paddingRight: 8,
                fontSize: material.textBigger
              }}
            >
              {days}
               {newMonth[0].name} {currentYear}
            </Text>
            <IconIonicons name="md-arrow-dropdown" style={styles.dropdown} />
          </TouchableOpacity>
        )}

        {this.props.isShowDate && (
          <Text
            style={{
              ...styles.dropdownHeader,
              paddingTop: 5,
              ...styles.textNormal
            }}
          >
            {day}
          </Text>
        )}

        <DateTimePicker
          date={this.props.defaultDate}
          cancelTextIOS={'Huỷ'}
          confirmTextIOS={'Chấp nhận'}
          titleIOS={this.props.titleIOS || 'Chọn ngày'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}

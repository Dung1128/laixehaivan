import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Icon from '../../elements/Icon';

import styles from '../DateTime/styles';

export default class TimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    // console.log(date);
    this.props.onChange &&
      this.props.onChange({
        name: moment(date).format('HH:mm'),
        full: date
      });
    this._hideDateTimePicker();
  };

  render() {
    const defaultValue = (
      <Text
        numberOfLines={1}
        style={{ ...styles.mainValueText, ...this.props.textStyle }}
      >
        {this.props.defaultValue}
      </Text>
    );
    const selectedOption = (
      <Text
        numberOfLines={1}
        style={{ ...styles.mainValueText, ...this.props.textStyle }}
      >
        {this.props.selectedOption.name || this.props.defaultValue}
      </Text>
    );
    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={this._showDateTimePicker}
          style={styles.dropdownHeader}
        >
          <TouchableOpacity
            style={styles.dropdownTextContainer}
            onPress={this._showDateTimePicker}
          >
            {this.props.selectedOption.name ? selectedOption : defaultValue}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownIcon}
            onPress={() => this._showDateTimePicker()}
          >
            <Icon name={'arrow-dropdown'} style={styles.icon} />
          </TouchableOpacity>
        </TouchableOpacity>
        <DateTimePicker
          is24Hour
          mode="time"
          date={
            new Date(
              this.props.defaultDateChose
                ? this.props.defaultDateChose
                : new Date()
            )
          }
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

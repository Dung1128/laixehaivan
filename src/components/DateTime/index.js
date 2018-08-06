import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Icon from '../../elements/Icon';

import styles from './styles';

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.props.onChange &&
      this.props.onChange({
        name: moment(date).format('DD-MM-YYYY'),
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
        <View style={styles.dropdownHeader}>
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
        </View>
        <DateTimePicker
          maximumDate={this.props.maximumDate}
          minimumDate={this.props.minimumDate}
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

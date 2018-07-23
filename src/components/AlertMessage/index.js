import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import { clearToast } from '../../store/actions/common';
import { getToast } from '../../store/selectors/common';

@connect(
  state => ({ toast: getToast(state) }),
  { clearToast }
)
export default class extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.toast !== this.props && nextProps.toast !== null) {
      Alert.alert(
        '',
        nextProps.toast.message,
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.clearToast();
            }
          }
        ],
        { cancelable: false, onDismiss: () => {} }
      );
    }
  }

  render() {
    return <View />;
  }
}

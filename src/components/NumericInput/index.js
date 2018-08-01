import React, { Component } from 'react';
import { Input } from 'native-base';

export default class NumericInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.formatNumber(props.value)
    };
  }

  formatNumber(value) {
    return value.replace(/,/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  // only run before render, not trigger re-render, because willReceiveProps not run when
  // setState
  componentWillReceiveProps({ value }) {
    this.setState({ value: this.formatNumber(value) });
  }

  render() {
    const { onChangeText, value, ...props } = this.props;
    return (
      <Input
        value={this.state.value}
        onChangeText={val => {
          this.setState({ value: this.formatNumber(val) });
          onChangeText && onChangeText(val.replace(/,/g, ''));
        }}
        returnKeyType="next"
        keyboardType="numeric"
        underlineColorAndroid="transparent"
        {...props}
      />
    );
  }
}

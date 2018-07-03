import React from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar, View, TextInput } from 'react-native';
import styles from './styles';
import material from '../../theme/variables/material';

export default class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string
  };

  render() {
    return (
      <View style={styles.rowItem}>
        {this.props.icon === 'email' ? (
          <IconMaterialIcons name={this.props.icon} size={20} />
        ) : (
          <IconFontAwesome name={this.props.icon} size={20} />
        )}

        <TextInput
          ref={this.props.inputRef}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          onChangeText={val => {
            this.props.onChange(val);
          }}
          style={styles.inputLogin}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

import React from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StatusBar,
  View,
  TextInput,
  Alert
} from 'react-native';
import styles from './styles';
import * as authActions from '../../store/actions/auth';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';

@connect(
  state => ({}),
  { ...commonActions, ...authActions }
)
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    };
  }

  onLogin() {
    // 01663643919
    //12345678
    if (this.state.phone === '') {
      return Alert.alert('Thông báo', 'Tài khoản không được để trống!');
    }
    // if (this.state.phone.length < 10 || this.state.phone.length > 13) {
    //   return Alert.alert('Thông báo', 'Số điện thoại không hợp lệ!');
    // }

    if (this.state.password === '') {
      return Alert.alert('Thông báo', 'Mật khẩu không được để trống!');
    }

    this.props.login(this.state.phone, this.state.password, 'login');
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.viewInput}>
            <View style={styles.rowItem}>
              <IconFontAwesome name={'user'} size={20} />
              <TextInput
                onSubmitEditing={() => {
                  this.password.focus();
                }}
                underlineColorAndroid="transparent"
                keyboardType={'default'}
                returnKeyType="next"
                autoCapitalize={'none'}
                onChangeText={val => {
                  this.setState({
                    phone: val
                  });
                }}
                style={styles.inputLogin}
                placeholder={'Tài khoản'}
              />
            </View>
            <View style={styles.rowItem}>
              <IconFontAwesome name={'lock'} size={20} />
              <TextInput
                underlineColorAndroid="transparent"
                ref={ref => (this.password = ref)}
                onSubmitEditing={() => this.onLogin()}
                returnKeyType="done"
                autoCapitalize={'none'}
                onChangeText={val => {
                  this.setState({
                    password: val
                  });
                }}
                secureTextEntry
                style={styles.inputLogin}
                placeholder={'Mật khẩu'}
              />
            </View>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={() => this.onLogin()}
              activeOpacity={0.7}
              style={styles.button}
            >
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.forwardTo('register')}
              style={{
                ...styles.button,
                backgroundColor: material.checkboxBgColor
              }}
            >
              <Text style={styles.textLogin}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.props.forwardTo('resetPassword')}
              activeOpacity={0.7}
            >
              <Text>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.forwardTo('gopY')}
              activeOpacity={0.7}
            >
              <Text>Góp ý?</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

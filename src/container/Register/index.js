import React from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StatusBar, View, TextInput } from 'react-native';
import styles from './styles';
import { reduxForm, Field } from 'redux-form';
import { InputField } from '../../elements/Form';
import * as authActions from '../../store/actions/auth';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import Input from './Input';

const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@connect(
  state => ({}),
  { ...commonActions, ...authActions }
)
@reduxForm({
  form: 'register',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      iconEye: 'eye',
      secureTextRe: true,
      iconEyeRe: 'eye'
    };
  }

  onRegister(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.phone.focus();
              }}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Họ và tên'}
              name={'user'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.email.focus();
              }}
              inputRef={e => (this.phone = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Điện thoại'}
              name={'phone'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.password.focus();
              }}
              inputRef={e => (this.email = e)}
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Email'}
              name={'email'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.confirmpassword.focus();
              }}
              inputRef={e => (this.password = e)}
              passwordOption
              secureTextEntry={this.state.secureText}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Mật khẩu'}
              name={'password'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
              icon={input => this.state.iconEye}
              onIconPress={input => {
                this.setState({
                  secureText: !this.state.secureText,
                  iconEye: this.state.iconEye === 'eye' ? 'eye-slash' : 'eye'
                });
              }}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={handleSubmit(this.onRegister.bind(this))}
              inputRef={e => (this.confirmpassword = e)}
              keyboardType="default"
              returnKeyType="done"
              autoCapitalize={'none'}
              secureTextEntry={this.state.secureTextRe}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Nhập lại mật khẩu'}
              name={'confirmpassword'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
              icon={input => this.state.iconEyeRe}
              onIconPress={input => {
                this.setState({
                  secureTextRe: !this.state.secureTextRe,
                  iconEyeRe:
                    this.state.iconEyeRe === 'eye' ? 'eye-slash' : 'eye'
                });
              }}
            />
          </View>

          <View>
            <Text>Chú ý: Số điện thoại là tài khoản đăng nhập</Text>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={handleSubmit(this.onRegister.bind(this))}
              activeOpacity={0.7}
              style={styles.button}
            >
              <Text style={styles.textLogin}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

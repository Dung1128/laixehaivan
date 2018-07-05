import React from 'react';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { InputField } from '../../elements/Form';
import styles from './styles';
import styless from '../Register/styles';
import material from '../../theme/variables/material';

@reduxForm({
  form: 'doimatkhau',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class DoiMatKhau extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      iconEye: 'eye',
      secureTextRe: true,
      iconEyeRe: 'eye'
    };
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
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
              IconIcom="lock"
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
              // onSubmitEditing={handleSubmit(this.onRegister.bind(this))}
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
              IconIcom="lock"
              onIconPress={input => {
                this.setState({
                  secureTextRe: !this.state.secureTextRe,
                  iconEyeRe:
                    this.state.iconEyeRe === 'eye' ? 'eye-slash' : 'eye'
                });
              }}
            />
          </View>

          <Button success style={styles.btn}>
            <Text>Xác nhận</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

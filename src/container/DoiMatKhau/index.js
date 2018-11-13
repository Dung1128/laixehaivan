import React from 'react';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { InputField } from '../../elements/Form';
import styles from './styles';
import styless from '../Register/styles';
import material from '../../theme/variables/material';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    initialValues: {
      password: '',
      passwordNew: '',
      confirmPassword: ''
    },
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state)
  }),
  { ...commonActions, ...haivanActions }
)
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
      iconEyeRe: 'eye',
      secureTextNew: true,
      iconEyeNew: 'eye'
    };
  }

  changePass(val) {
    if (
      val.password.toString() === '' ||
      val.passwordNew.toString() === '' ||
      val.confirmPassword.toString() === ''
    ) {
      return this.props.setToast('Mật khẩu không được để trống!');
    }

    if (val.passwordNew.toString() !== val.confirmPassword.toString()) {
      return this.props.setToast('Mật khẩu không trùng khớp!');
    }

    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      password: val.confirmPassword.toString(),
      passwordOld: val.password.toString()
    };

    this.props.changePassword(params, (e, d) => {
      if (e) {
        this.props.setToast(e.message.message, 'error');
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.passwordNew.focus();
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
              IconIcomColor={material.colorDark}
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
              onSubmitEditing={() => {
                this.confirmpassword.focus();
              }}
              inputRef={e => (this.passwordNew = e)}
              passwordOption
              secureTextEntry={this.state.secureTextNew}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styles.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Mật khẩu mới'}
              name={'passwordNew'}
              IconIcomColor={material.colorDark}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styles.input}
              icon={input => this.state.iconEyeNew}
              IconIcom="lock"
              onIconPress={input => {
                this.setState({
                  secureTextNew: !this.state.secureTextNew,
                  iconEyeNew:
                    this.state.iconEyeNew === 'eye' ? 'eye-slash' : 'eye'
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
              IconIcomColor={material.colorDark}
              name={'confirmPassword'}
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

          <Button
            onPress={handleSubmit(this.changePass.bind(this))}
            style={styles.btn}
          >
            <Text style={styles.textNormal}>Xác nhận</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

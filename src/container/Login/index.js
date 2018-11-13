import React from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StatusBar,
  View,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { InputField } from '../../elements/Form';
import styles from './styles';
import styless from '../Register/styles';
import * as authActions from '../../store/actions/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import images from '../../assets/images';

@connect(
  state => ({}),
  { ...commonActions, ...authActions, ...haivanActions }
)
@reduxForm({
  form: 'login',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      iconEye: 'eye',
      phone: '',
      password: ''
    };
  }

  onLogin(val) {
    // 01663643919
    //12345678
    if (val.user === '') {
      return Alert.alert('Thông báo', 'Tài khoản không được để trống!');
    }
    // if (this.state.phone.length < 10 || this.state.phone.length > 13) {
    //   return Alert.alert('Thông báo', 'Số điện thoại không hợp lệ!');
    // }

    if (val.password === '') {
      return Alert.alert('Thông báo', 'Mật khẩu không được để trống!');
    }

    this.props.login(val.user, val.password, 'login', (e, d) => {
      if (d) {
        // console.log(d);
        const params = {
          adm_id: d.adm_id,
          token: d.token
        };
        this.props.getMenu(params, (e, d) => {
          if (d && d.arrMenu) {
            this.props.saveMenu(d.arrMenu);
          }
        });
        this.props.forwardTo('chuyenDiCuaBan');
      }
    });
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
          <View style={styles.viewLogo}>
            <Image source={images.logoapp1} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.textInputContainer}>
              <Field
                onSubmitEditing={() => {
                  this.password.focus();
                }}
                inputRef={e => (this.phone = e)}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize={'none'}
                style={styless.textInput}
                icon={input => (input.value ? 'close' : null)}
                onIconPress={input => input.onChange('')}
                label={'Tài khoản'}
                name={'user'}
                IconIcomColor={material.colorDark}
                component={InputField}
                autoCorrect={false}
                placeholderTextColor="#7e7e7e"
                IconIcom="contact"
                inputStyle={styless.input}
              />
            </View>

            <View style={styless.textInputContainer}>
              <Field
                onSubmitEditing={handleSubmit(this.onLogin.bind(this))}
                inputRef={e => (this.password = e)}
                passwordOption
                secureTextEntry={this.state.secureText}
                keyboardType="default"
                returnKeyType="done"
                autoCapitalize={'none'}
                style={styless.textInput}
                icon={input => (input.value ? 'close' : null)}
                onIconPress={input => input.onChange('')}
                label={'Mật khẩu'}
                name={'password'}
                IconIcomColor={material.colorDark}
                component={InputField}
                autoCorrect={false}
                placeholderTextColor="#7e7e7e"
                inputStyle={styless.input}
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
            <View style={styles.viewButton}>
              <TouchableOpacity
                onPress={handleSubmit(this.onLogin.bind(this))}
                activeOpacity={0.7}
                style={styles.button}
              >
                <Text style={styles.textLogin}>Đăng nhập</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.forwardTo('register')}
              style={{
                ...styles.button,
                backgroundColor: material.checkboxBgColor
              }}
            >
              <Text style={styles.textLogin}>Đăng ký</Text>
            </TouchableOpacity> */}
            </View>
          </View>
          {/* <View style={styles.footer}>
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
          </View> */}
        </Content>
      </Container>
    );
  }
}

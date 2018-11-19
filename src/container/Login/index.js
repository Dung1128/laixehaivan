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
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      iconEye: 'eye',
      user: '',
      password: ''
    };
  }

  onLogin() {
    if (this.state.user === '') {
      return Alert.alert('Thông báo', 'Tài khoản không được để trống!');
    }

    if (this.state.password === '') {
      return Alert.alert('Thông báo', 'Mật khẩu không được để trống!');
    }

    this.props.login(this.state.user, this.state.password, 'login', (e, d) => {
      if (d) {
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
              <IconFontAwesome name="user" size={24} style={styles.icon} />
              <TextInput
                onChangeText={val => this.setState({ user: val })}
                autoCapitalize={'none'}
                underlineColorAndroid="transparent"
                placeholderTextColor={material.inputBorderColor}
                placeholder="Tên tài khoản"
                style={styles.input}
              />
            </View>

            <View style={styles.textInputContainer}>
              <IconFontAwesome
                name="unlock-alt"
                size={24}
                style={styles.icon}
              />
              <TextInput
                returnKeyType="done"
                onChangeText={val => this.setState({ password: val })}
                secureTextEntry
                autoCapitalize={'none'}
                underlineColorAndroid="transparent"
                placeholderTextColor={material.inputBorderColor}
                placeholder="Mật khẩu"
                style={styles.input}
              />
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity
                onPress={() => this.onLogin()}
                activeOpacity={0.7}
                style={styles.button}
              >
                <Text style={styles.textLogin}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

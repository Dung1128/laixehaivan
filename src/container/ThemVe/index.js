import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import * as commonActions from '../../store/actions/common';
import { InputField } from '../../elements/Form';
import styless from '../Register/styles';
import styles from './styles';
import material from '../../theme/variables/material';
import KhuyenMai from './KhuyenMai';

@reduxForm({
  form: 'themVe',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
@connect(
  null,
  { ...commonActions }
)
export default class ThemVe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noidon: false,
      noitra: false,
      visible: false,
      khuyenMai: {
        id: 3,
        value: 'Mã khuyễn mãi'
      }
    };
  }

  DatVe(val) {
    console.log(val);
    this.props.resetTo('soDoGiuong');
  }

  renderGiave(title, val) {
    return (
      <View style={styles.viewGiaVe}>
        <Text style={styles.textNormal}>{title}</Text>
        <Text style={{ ...styles.textNormal, color: material.colorDeclined }}>
          {val}
        </Text>
      </View>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content showsVerticalScrollIndicator={false}>
          <View style={styless.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.phone.focus();
              }}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Họ và tên'}
              name={'user'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'person'}
              IconIcomColor={material.colorDark2}
            />
          </View>

          <View style={styless.textInputContainer}>
            <Field
              onSubmitEditing={() => {
                this.email.focus();
              }}
              inputRef={e => (this.phone = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Điện thoại'}
              name={'phone'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'call'}
              IconIcomColor={material.colorDark2}
            />
          </View>

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              onSubmitEditing={() => {
                this.password.focus();
              }}
              inputRef={e => (this.email = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Nơi đón'}
              name={'noidon'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'home'}
              IconIcomColor={material.colorDark2}
            />
            {!this.state.noidon ? (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    noidon: !this.state.noidon
                  })
                }
                activeOpacity={0.5}
              >
                <IconMaterialIcons
                  name="check-box-outline-blank"
                  size={24}
                  color={material.colorDark2}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    noidon: !this.state.noidon
                  })
                }
                activeOpacity={0.5}
              >
                <IconMaterialIcons
                  name="check-box"
                  size={24}
                  color={material.colorDark2}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              onSubmitEditing={() => {
                this.confirmpassword.focus();
              }}
              inputRef={e => (this.password = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Nơi trả'}
              name={'noitra'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom="home"
              IconIcomColor={material.colorDark2}
            />
            {!this.state.noitra ? (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    noitra: !this.state.noitra
                  })
                }
                activeOpacity={0.5}
              >
                <IconMaterialIcons
                  name="check-box-outline-blank"
                  size={24}
                  color={material.colorDark2}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    noitra: !this.state.noitra
                  })
                }
                activeOpacity={0.5}
              >
                <IconMaterialIcons
                  name="check-box"
                  size={24}
                  color={material.colorDark2}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styless.textInputContainer}>
            <Field
              inputRef={e => (this.confirmpassword = e)}
              keyboardType="default"
              returnKeyType="done"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Ghi chú'}
              name={'ghichu'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'clipboard'}
              IconIcomColor={material.colorDark2}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.setState({ visible: !this.state.visible })}
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <IconFontAwesome
              name="gift"
              size={24}
              color={material.colorDark2}
            />
            <Text style={styles.textNormal}>{this.state.khuyenMai.value}</Text>
          </TouchableOpacity>

          <View style={{ ...styless.textInputContainer, marginBottom: 0 }}>
            {this.state.khuyenMai.id === 2 && (
              <View style={styles.inputKhuyenMai}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Số tiền giảm"
                />
              </View>
            )}
            {this.state.khuyenMai.id === 3 && (
              <View
                style={{
                  ...styles.inputKhuyenMai,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 0,
                  alignItems: 'center'
                }}
              >
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Mã giảm giá"
                />
                <Button success style={styles.button}>
                  <Text>Sử dụng</Text>
                </Button>
              </View>
            )}
          </View>
          <View
            style={{
              ...styless.textInputContainer,
              paddingVertical: material.paddingSmall
            }}
          >
            {this.renderGiave('Giá gốc:', '260.000 VND')}
            {this.renderGiave('Giảm:', '1.000 VND')}
            {this.renderGiave('Giá vé:', '259.000 VND')}
          </View>
          <Button
            onPress={handleSubmit(this.DatVe.bind(this))}
            success
            style={styles.buttonDatVe}
          >
            <Text>Đặt vé</Text>
          </Button>
        </Content>
        <KhuyenMai
          setKhuyenMai={ob =>
            this.setState({
              khuyenMai: ob
            })
          }
          handleVisible={val =>
            this.setState({
              visible: val
            })
          }
          visible={this.state.visible}
        />
      </Container>
    );
  }
}

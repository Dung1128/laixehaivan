import React from 'react';
import { TouchableOpacity, TextInput, Alert } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import numeral from 'numeral';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import * as commonActions from '../../store/actions/common';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as authSelectors from '../../store/selectors/auth';
// import { setToast } from '../../store/actions/common';
import { InputField } from '../../elements/Form';
import styless from '../Register/styles';
import styles from './styles';
import material from '../../theme/variables/material';
import KhuyenMai from './KhuyenMai';
import ModalFilter from '../ThanhTra/ModalFilter';
import DanhMucVe from './DanhMucVe';

@reduxForm({
  form: 'themVe',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    dmVe: haivanSelectors.getDanhMucVe(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ThemVe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noidon: false,
      noitra: false,
      visible: false,
      visibleDiemDi: false,
      visibleDiemDen: false,
      price: { price: 0 },
      bvd_id: {},
      khuyenMai: {
        id: 3,
        value: 'Mã khuyễn mãi'
      },
      diemdi: this.props.route.params.data[0],
      diemden: this.props.route.params.data[
        this.props.route.params.data.length - 1
      ],
      giamgia: 0,
      detailVe: this.props.route.params.detailVe,
      seri: 0,
      key_danh_muc: ''
    };

    this.danhMuc = [];
    this.props.dmVe.dataDM.map(item =>
      this.danhMuc.push({ ...item, label: item.bvd_ma_ve, value: item.bvd_id })
    );

    console.log('danh muc ve', this.props.dmVe.dataDM);
    console.log('detail ve', this.props.route.params.detailVe);
  }

  componentDidMount() {
    this.showGiaVe();
  }

  DatVe(val) {
    console.log(val, this.state.diemden, this.state.diemdi);

    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      bvv_id: this.props.route.params.detailVe.arrVe.bvv_id,
      diem_a: this.state.diemdi.bex_id,
      diem_b: this.state.diemden.bex_id,
      seri: this.state.seri,
      key_danh_muc: this.state.key_danh_muc,
      price: this.state.price.price,
      phone: this.state.phone
    };

    this.props.insertVe(params, () => this.props.forwardTo('soDoGiuong'));
  }

  getSeri(val) {
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      dm_id: this.state.key_danh_muc,
      price: this.state.price.price
    };

    this.props.getSeriMin(params, (e, d) => {
      if (d) {
        this.setState({
          seri: d.seri
        });
      }
    });
  }

  showGiaVe() {
    if (this.state.diemdi.bex_ten == '') {
      this.props.setToast('Xin mời nhập điểm đi');
    }

    if (this.state.diemden.bex_ten == '') {
      this.props.setToast('Xin mời nhập điểm đến');
    }

    this.setState({
      price: _.find(
        _.find(this.props.route.params.dataGiaVe, {
          diem_a: this.state.diemdi.bex_id
        }).data,
        {
          diem_b: this.state.diemden.bex_id
        }
      )
    });
  }

  checkSelectedDiemDi(val) {
    this.setState({ diemdi: val }, () => this.showGiaVe());

    const soDoA = _.find(this.props.route.params.dataGiaVe, {
      diem_a: val.bex_id
    });
  }

  checkSelectedDiemDen(val) {
    this.setState({ diemden: val }, () => this.showGiaVe());
  }

  renderItem(item, nameIcon, title, type) {
    return (
      <TouchableOpacity
        style={styles.itemFilter}
        onPress={() =>
          type === 0
            ? this.setState({
                visibleDiemDi: true
              })
            : this.setState({
                visibleDiemDen: true
              })
        }
      >
        <IconMaterialCommunityIcons
          name={nameIcon}
          size={24}
          color={material.colorDark2}
        />
        <Text
          style={{
            ...styles.textNormal,
            paddingLeft: material.paddingSmall,
            color: material.colorDark2
          }}
        >
          {title}: {item.bex_ten}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  renderGiave(title, val) {
    return (
      <View style={styles.viewGiaVe}>
        <Text style={styles.textNormal}>{title}</Text>
        <Text style={{ ...styles.textNormal, color: material.colorDeclined }}>
          {numeral(val).format('0,0')} VNĐ
        </Text>
      </View>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content showsVerticalScrollIndicator={false}>
          {this.renderItem(this.state.diemdi, 'bus', 'Điểm đi', 0)}
          {this.renderItem(this.state.diemden, 'bus', 'Điểm đến', 1)}
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
                  underlineColorAndroid="transparent"
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
                  underlineColorAndroid="transparent"
                  style={styles.fieldInput}
                  placeholder="Mã giảm giá"
                />
                <Button success style={styles.button}>
                  <Text>Sử dụng</Text>
                </Button>
              </View>
            )}
          </View>
          {this.state.detailVe.bvv_seri !== 0 ? (
            <DanhMucVe
              // initialValue={}
              data={this.danhMuc}
              onChangeText={value => {
                this.setState(
                  {
                    key_danh_muc: value
                  },
                  () => this.getSeri()
                );
              }}
            />
          ) : (
            <View
              style={{
                ...styless.textInputContainer,
                paddingVertical: material.paddingSmall
              }}
            >
              <Text style={styles.textNormal}>{1}</Text>
            </View>
          )}
          <View
            style={{
              ...styless.textInputContainer,
              paddingTop: material.paddingSmall,
              marginBottom: 0
            }}
          >
            <Text style={styles.textNormal}>Seri: {this.state.seri}</Text>
          </View>

          <View
            style={{
              ...styless.textInputContainer,
              paddingVertical: material.paddingSmall
            }}
          >
            {this.renderGiave(
              'Giá gốc:',
              this.state.price && this.state.price.price
            )}
            {this.renderGiave('Giảm:', this.state.giamgia)}
            {this.renderGiave(
              'Giá vé:',
              this.state.price && this.state.price.price - this.state.giamgia
            )}
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

        <ModalFilter
          data={this.props.route.params.data}
          selectedValue={val => this.checkSelectedDiemDi(val)}
          handleVisible={val =>
            this.setState({
              visibleDiemDi: val
            })
          }
          visible={this.state.visibleDiemDi}
        />

        <ModalFilter
          data={this.props.route.params.data}
          selectedValue={val => this.checkSelectedDiemDen(val)}
          handleVisible={val =>
            this.setState({
              visibleDiemDen: val
            })
          }
          visible={this.state.visibleDiemDen}
        />
      </Container>
    );
  }
}

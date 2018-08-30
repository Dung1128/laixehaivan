import React from 'react';
import { TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import numeral from 'numeral';
import * as JsSearch from 'js-search';

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

@connect(
  state => ({
    initialValues: {
      user: haivanSelectors.getVe(state).arrVe.bvv_ten_khach_hang,
      phone: haivanSelectors.getVe(state).arrVe.bvv_phone,
      noidon: haivanSelectors.getVe(state).arrVe.bvv_diem_don_khach,
      noitra: haivanSelectors.getVe(state).arrVe.bvv_diem_tra_khach,
      ghichu: haivanSelectors.getVe(state).arrVe.bvv_ghi_chu,
      tenNguoiDi: haivanSelectors.getVe(state).arrVe.bvv_ten_khach_hang_di,
      phoneNguoiDi: haivanSelectors.getVe(state).arrVe.bvv_phone_di
    },
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    dmVe: haivanSelectors.getDanhMucVe(state),
    getConnect: haivanSelectors.saveConnect(state)
  }),
  { ...commonActions, ...haivanActions }
)
@reduxForm({
  form: 'themVe',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
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
      khuyenMai:
        this.props.route.params.detailVe.arrVe.bvv_hinh_thuc_giam_gia > 0
          ? {
              id: this.props.route.params.detailVe.arrVe.bvv_hinh_thuc_giam_gia,
              value:
                this.props.route.params.detailVe.arrVe
                  .bvv_hinh_thuc_giam_gia === 3
                  ? 'Trực tiếp'
                  : this.props.route.params.detailVe.arrVe
                      .bvv_hinh_thuc_giam_gia === 4
                    ? 'Trẻ em'
                    : 'Mã khuyến mãi'
            }
          : {
              id: 0,
              value: 'Chọn hình thức khyến mãi'
            },
      diemdi:
        this.props.route.params.detailVe.arrVe.bvv_bex_id_a === 0
          ? _.find(this.props.route.params.data, {
              bex_id: this.props.route.params.infoChuyen.tuy_ben_a
            })
            ? _.find(this.props.route.params.data, {
                bex_id: this.props.route.params.infoChuyen.tuy_ben_a
              })
            : {
                bex_id: 'Mời chọn chuyến',
                bex_id: 0
              }
          : _.find(this.props.route.params.data, {
              bex_id: this.props.route.params.detailVe.arrVe.bvv_bex_id_a
            }),
      diemden:
        this.props.route.params.detailVe.arrVe.bvv_bex_id_b === 0
          ? _.find(this.props.route.params.data, {
              bex_id: this.props.route.params.infoChuyen.tuy_ben_b
            })
            ? _.find(this.props.route.params.data, {
                bex_id: this.props.route.params.infoChuyen.tuy_ben_b
              })
            : {
                bex_id: 'Mời chọn chuyến',
                bex_id: 0
              }
          : _.find(this.props.route.params.data, {
              bex_id: this.props.route.params.detailVe.arrVe.bvv_bex_id_b
            }),
      giamgia: this.props.route.params.detailVe.arrVe.bvv_price_discount,
      detailVe: this.props.route.params.detailVe,
      seri: this.props.route.params.detailVe.arrVe.bvv_seri,
      key_danh_muc: '',
      giam_gia_text: this.props.route.params.detailVe.arrVe.bvv_giu_code,
      hinh_thuc_giam_gia: '',
      phone: this.props.route.params.detailVe.arrVe.bvv_phone,
      checkGiamGiaText:
        this.props.route.params.detailVe.arrVe.bvv_hinh_thuc_giam_gia > 0,
      price_truc_tiep: this.props.route.params.detailVe.arrVe
        .bvv_price_discount,
      listDiemNot: this.props.route.params.data
    };

    this.danhMuc = [];

    // console.log('info', this.props.route.params.infoChuyen);
    // console.log('danh muc ve', this.props.route.params.data);
    // console.log('detail ve', this.props.route.params.detailVe);
    // console.log('this.props.route.params.data', this.props.route.params.data);
  }

  componentDidMount() {
    this.showGiaVe();
  }

  saveParams(params) {
    // console.log(params);
    this.props.saveOffline(params);
    this.props.resetTo('soDoGiuong');
  }

  DatVe(val) {
    if (this.state.phone.toString() != '') {
      if (
        this.state.phone.toString().length > 13 ||
        this.state.phone.toString().length < 10
      ) {
        // console.log(this.state.phone);
        return Alert.alert('Thông báo', 'Số điện thoại sai dịnh dạng');
      }
    }

    if (val.phoneNguoiDi.toString() !== '') {
      if (
        val.phoneNguoiDi.toString().length > 13 ||
        val.phoneNguoiDi.toString().length < 10
      ) {
        // console.log(val.phoneNguoiDi);
        return Alert.alert('Thông báo', 'Số điện thoại sai dịnh dạng');
      }
    }

    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      bvv_id: this.props.route.params.detailVe.arrVe.bvv_id,
      diem_a: this.state.diemdi.bex_id,
      diem_b: this.state.diemden.bex_id,
      seri: this.state.seri,
      key_danh_muc: this.state.key_danh_muc,
      price:
        this.props.route.params.detailVe.arrVe.arrGVLH.bvop_hinh_thuc === 0
          ? this.state.price.price -
            this.state.giamgia -
            this.props.route.params.detailVe.arrVe.arrGVLH.bvop_tien_mat
          : this.state.price.price -
            this.state.giamgia -
            ((this.state.price.price - this.state.giamgia) *
              this.props.route.params.detailVe.arrVe.arrGVLH.bvop_phan_tram) /
              100,
      phone: this.state.phone,
      trung_chuyen_tra: this.state.noitra,
      trung_chuyen_don: this.state.noidon,
      ghi_chu: val.ghichu,
      diem_tra: val.noitra,
      diem_don: val.noidon,
      fullname: val.user,
      bvv_ten_khach_hang_di: val.tenNguoiDi,
      bvv_phone_di: val.phoneNguoiDi,
      hinh_thuc_giam_gia:
        this.state.checkGiamGiaText === true ? this.state.khuyenMai.id : '',
      giam_gia_text:
        this.state.checkGiamGiaText === true ? this.state.giam_gia_text : '',
      price_truc_tiep: parseInt(this.state.giamgia),
      bvv_number: this.props.route.params.detailVe.bvv_number,
      soGhe: this.props.route.params.detailVe.arrVe.sdgct_label_full
    };

    this.props.getConnect
      ? this.props.insertVe(params, (e, d) => {
          if (d) {
            this.props.actionUpdateSDG(new Date());
            this.props.resetTo('soDoGiuong');
          }
          if (e && e.message) {
            this.props.setToast(e.message.message, 'error');
          }
        })
      : this.saveParams(params);
  }

  UpdateVe(val) {
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
      phone: val.phone,
      trung_chuyen_tra: this.state.noitra,
      trung_chuyen_don: this.state.noidon,
      ghi_chu: val.ghichu,
      diem_tra: val.noitra,
      diem_don: val.noidon,
      fullname: val.user,
      bvv_ten_khach_hang_di: val.tenNguoiDi,
      bvv_phone_di: val.phoneNguoiDi,
      price_truc_tiep: parseInt(this.state.giamgia),
      hinh_thuc_giam_gia:
        this.state.checkGiamGiaText === true ? this.state.khuyenMai.id : '',
      giam_gia_text:
        this.state.checkGiamGiaText === true ? this.state.giam_gia_text : ''
    };

    this.props.updateVe(params, () => {
      this.props.forwardTo('soDoGiuong');
      this.props.actionUpdateSDG(new Date());
    });
  }

  checkKhuyenMai() {
    // console.log('this.state.khuyenMai', this.state.khuyenMai.id);
    switch (this.state.khuyenMai.id) {
      case 4: {
        const params = {
          adm_id: this.props.profile.adm_id,
          token: this.props.token,
          did_id: this.props.did_id,
          bvv_id: this.props.route.params.detailVe.arrVe.bvv_id,
          diem_a: this.state.diemdi.bex_id,
          diem_b: this.state.diemden.bex_id
        };
        return this.props.giamGiaTreEm(params, (e, d) => {
          if (d && d.price_discount) {
            this.setState({
              giamgia: d.price_discount,
              checkGiamGiaText: true
            });
          }
        });
      }
      case 3:
        return this.setState({ checkGiamGiaText: true, giamgia: 0 });

      default:
        return console.log('false');
    }
  }

  onSuDungMa() {
    this.setState({
      checkGiamGiaText: false
    });
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      bvv_id: this.props.route.params.detailVe.arrVe.bvv_id,
      diem_a: this.state.diemdi.bex_id,
      diem_b: this.state.diemden.bex_id,
      phone: this.state.phone,
      giam_gia_text: this.state.giam_gia_text
    };
    this.props.giamGiaText(params, (e, d) => {
      if (d && d.price_discount) {
        this.setState({
          giamgia: d.price_discount,
          checkGiamGiaText: true
        });
      } else {
        if (e.message.message) {
          this.props.setToast(e.message.message, 'error');
        } else {
          this.props.setToast(e.message.message, 'error');
        }
      }
    });
    Keyboard.dismiss();
  }

  getSeri(val) {
    // console.log('val', val);
    if (val === 0) {
      return this.setState({ seri: 0 });
    } else {
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
  }

  showGiaVe() {
    if (this.state.diemdi.bex_ten == '') {
      this.props.setToast('Xin mời nhập điểm đi');
    }

    if (this.state.diemden.bex_ten == '') {
      this.props.setToast('Xin mời nhập điểm đến');
    }

    if (
      _.find(
        _.find(this.props.route.params.dataGiaVe, {
          diem_a: this.state.diemdi.bex_id
        })
      )
    ) {
      if (
        _.find(
          _.find(this.props.route.params.dataGiaVe, {
            diem_a: this.state.diemdi.bex_id
          }).data,
          {
            diem_b: this.state.diemden.bex_id
          }
        )
      ) {
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
    }

    //   this.setState({
    //     price: _.find(
    //       _.find(this.props.route.params.dataGiaVe, {
    //         diem_a: this.state.diemdi.bex_id
    //       }).data,
    //       {
    //         diem_b: this.state.diemden.bex_id
    //       }
    //     )
    //   });
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

  checkEditAddress(type) {
    if (
      this.state.seri !== 0 ||
      this.props.route.params.detailVe.arrVe.bvv_status === 11
    ) {
      Alert.alert('Không được thay đổi địa điểm');
    } else {
      type === 0
        ? this.setState({
            visibleDiemDi: true
          })
        : this.setState({
            visibleDiemDen: true
          });
    }
  }

  renderItem(item, nameIcon, title, type) {
    return (
      <TouchableOpacity
        style={styles.itemFilter}
        onPress={() => this.checkEditAddress(type)}
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

  viewSeri(title, val) {
    return (
      <View style={styles.viewGiaVe}>
        <Text style={styles.textNormal}>{title}</Text>
        <Text style={{ ...styles.textNormal, color: material.colorDeclined }}>
          {val}
        </Text>
      </View>
    );
  }

  mapKhuyenMai(key) {
    switch (key) {
      case 3:
        return this.viewSeri('Hình thức khuyến mãi', 'Trực tiếp');
      case 4:
        return this.viewSeri('Hình thức khuyến mãi', 'Trẻ em');
      case 6:
        return (
          <View>
            {this.viewSeri('Hình thức khuyến mãi', 'Mã khuyến mãi')}
            {this.viewSeri('Mã khuyến mãi', this.state.giam_gia_text)}
          </View>
        );

      default:
        return <View />;
    }
  }

  searchDiemDi(val) {
    var search = new JsSearch.Search('bex_ten');
    search.addIndex('bex_ten');
    search.addDocuments(this.props.route.params.data);
    this.setState({
      listDiemNot: search.search(val)
    });

    if (val === '') {
      this.setState({
        listDiemNot: this.props.route.params.data
      });
    }
    // console.log(search.search(val));
  }

  searchDiemDen(val) {
    var search = new JsSearch.Search('bex_ten');
    search.addIndex('bex_ten');
    search.addDocuments(this.props.route.params.data);
    this.setState({
      listDiemNot: search.search(val)
    });

    if (val === '') {
      this.setState({
        listDiemNot: this.props.route.params.data
      });
    }
    // console.log(search.search(val));
  }

  render() {
    const { handleSubmit } = this.props;
    const totalPrice =
      this.props.route.params.detailVe.arrVe.arrGVLH.bvop_hinh_thuc === 0
        ? this.state.price.price -
          this.props.route.params.detailVe.arrVe.arrGVLH.bvop_tien_mat
        : this.state.price.price -
          (this.state.price.price *
            this.props.route.params.detailVe.arrVe.arrGVLH.bvop_phan_tram) /
            100;
    // console.log(this.props.getConnect);

    return (
      <Container style={styles.container}>
        <Content
          enableResetScrollToCoords={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {this.renderItem(this.state.diemdi, 'bus', 'Điểm đi', 0)}
            {this.renderItem(this.state.diemden, 'bus', 'Điểm đến', 1)}
          </View>

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Field
              onSubmitEditing={() => {
                // this.tenNguoiDi.focus();
              }}
              customOnChange={val => this.setState({ phone: val })}
              inputRef={e => (this.phone = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              // icon={input => (input.value ? 'close' : null)}
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
            <Field
              onSubmitEditing={() => {
                // this.phone.focus();
              }}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              // icon={input => (input.value ? 'close' : null)}
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

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Field
              onSubmitEditing={() => {
                // this.email.focus();
              }}
              // customOnChange={val => this.setState({ phone: val })}
              inputRef={e => (this.phoneNguoiDi = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              // icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Điện thoại người đi'}
              name={'phoneNguoiDi'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'call'}
              IconIcomColor={material.colorDark2}
            />
            <Field
              onSubmitEditing={() => {
                // this.phoneNguoiDi.focus();
              }}
              // customOnChange={val => this.setState({ tenNguoiDi: val })}
              inputRef={e => (this.tenNguoiDi = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              // icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Tên người đi'}
              name={'tenNguoiDi'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'person'}
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
                // this.password.focus();
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
                  size={28}
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
                  size={28}
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
                // this.ghiChu.focus();
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
                  size={28}
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
                  size={28}
                  color={material.colorDark2}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styless.textInputContainer}>
            <Field
              inputRef={e => (this.ghiChu = e)}
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
          {this.state.seri === 0 &&
            this.props.route.params.detailVe.arrVe.bvv_status !== 11 && (
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
                <Text
                  style={{
                    ...styles.textNormal,
                    paddingLeft: material.paddingSmall
                  }}
                >
                  {this.state.khuyenMai.value}
                </Text>
              </TouchableOpacity>
            )}
          {this.state.seri === 0 && (
            <View>
              <View style={{ ...styless.textInputContainer, marginBottom: 0 }}>
                {this.state.khuyenMai.id === 3 && (
                  <View style={styles.inputKhuyenMai}>
                    <TextInput
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      style={styles.fieldInput}
                      placeholder="Số tiền giảm"
                      onChangeText={val => this.setState({ giamgia: val })}
                    />
                  </View>
                )}
                {this.state.khuyenMai.id === 6 && (
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
                      defaultValue={this.state.giam_gia_text}
                      underlineColorAndroid="transparent"
                      style={styles.fieldInput}
                      placeholder="Mã giảm giá"
                      onChangeText={val =>
                        this.setState({ giam_gia_text: val })
                      }
                    />
                    <Button
                      onPress={() => this.onSuDungMa()}
                      success
                      style={styles.button}
                    >
                      <Text>Sử dụng</Text>
                    </Button>
                  </View>
                )}
              </View>
            </View>
          )}
          {/* Chỉnh danh mục vé mới price mới*/}
          {this.state.detailVe.arrVe.bvv_seri === 0 && (
            <DanhMucVe
              // price={this.state.price.price - this.state.giamgia}
              //price danh mục giờ lấy giá gốc của vé
              price={
                this.props.route.params.detailVe.arrVe.arrGVLH
                  .bvop_hinh_thuc === 0
                  ? this.state.price.price -
                    this.props.route.params.detailVe.arrVe.arrGVLH.bvop_tien_mat
                  : this.state.price.price -
                    (this.state.price.price *
                      this.props.route.params.detailVe.arrVe.arrGVLH
                        .bvop_phan_tram) /
                      100
              }
              seri={this.state.seri}
              // initialValue={}
              data={[{ ...{ label: 'Bỏ chọn', value: 0 } }, ...this.danhMuc]}
              onChangeText={value => {
                this.setState(
                  {
                    key_danh_muc: value
                  },
                  () => this.getSeri(value)
                );
              }}
            />
          )}

          {this.state.detailVe.arrVe.bvv_seri !== 0 && (
            <View>
              {this.viewSeri(
                'Danh mục vé: ',
                this.state.detailVe.arrVe.bvv_danh_muc
              )}
              {this.viewSeri('Seri: ', this.state.detailVe.arrVe.bvv_seri)}
            </View>
          )}

          {this.mapKhuyenMai(this.state.detailVe.arrVe.bvv_hinh_thuc_giam_gia)}

          <View
            style={{
              ...styless.textInputContainer
              // paddingVertical: material.paddingSmall
            }}
          >
            {this.renderGiave(
              'Giá gốc:',
              this.state.price &&
              this.props.route.params.detailVe.arrVe.arrGVLH.bvop_hinh_thuc ===
                0
                ? this.state.price.price -
                  this.props.route.params.detailVe.arrVe.arrGVLH.bvop_tien_mat
                : this.state.price.price -
                  (this.state.price.price *
                    this.props.route.params.detailVe.arrVe.arrGVLH
                      .bvop_phan_tram) /
                    100
            )}
            {this.renderGiave('Giảm:', this.state.giamgia)}
            {this.renderGiave(
              'Giá vé:',
              this.state.price && totalPrice > 0 ? totalPrice : 0
            )}
          </View>
          {this.state.detailVe.arrVe.bvv_status !== 0 ? (
            <Button
              onPress={handleSubmit(this.UpdateVe.bind(this))}
              success
              style={styles.buttonDatVe}
            >
              <Text>Cập nhật</Text>
            </Button>
          ) : (
            <Button
              onPress={handleSubmit(this.DatVe.bind(this))}
              success
              style={styles.buttonDatVe}
            >
              <Text>Đặt vé</Text>
            </Button>
          )}
        </Content>

        <KhuyenMai
          setKhuyenMai={ob => {
            this.setState(
              {
                khuyenMai: ob
              },
              () => this.checkKhuyenMai()
            );
          }}
          handleVisible={val =>
            this.setState({
              visible: val
            })
          }
          visible={this.state.visible}
        />

        <ModalFilter
          data={[
            {
              ...{
                bex_ten: 'Bỏ chọn',
                bex_id: 0
              }
            },
            ...this.state.listDiemNot
          ]}
          onSearch={val => this.searchDiemDi(val)}
          selectedValue={val => this.checkSelectedDiemDi(val)}
          handleVisible={val =>
            this.setState({
              visibleDiemDi: val
            })
          }
          visible={this.state.visibleDiemDi}
        />

        <ModalFilter
          data={[
            {
              ...{
                bex_ten: 'Bỏ chọn',
                bex_id: 0
              }
            },
            ...this.state.listDiemNot
          ]}
          onSearch={val => this.searchDiemDen(val)}
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

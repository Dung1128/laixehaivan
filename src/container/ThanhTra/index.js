import React from 'react';
import { TouchableOpacity, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, View, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { reduxForm, Field } from 'redux-form';
import * as JsSearch from 'js-search';
import numeral from 'numeral';
import AddImage from '../../components/AddImage';
import NumericInput from '../../components/NumericInput';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFilter from './ModalFilter';
import * as commonActions from '../../store/actions/common';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as authSelectors from '../../store/selectors/auth';
import { InputField } from '../../elements/Form';
import material from '../../theme/variables/material';
import platform from '../../theme/variables/platform';
import styles from './styles';
import styless from '../Register/styles';

@connect(
  state => ({
    initialValues: {
      noiDungViPham: '',
      ghiChu: ''
    },
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    dmVe: haivanSelectors.getDanhMucVe(state),
    getThanhTraData: haivanSelectors.saveThanhTraData(state)
  }),
  { ...commonActions, ...haivanActions }
)
@reduxForm({
  form: 'thanhTra',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class ThanhTra extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleViPham: false,
      visibleDiaDiem: false,
      viPham: {
        xdm_id: 0,
        xdm_name: 'Loại vi phạm'
      },
      address: {
        dtt_id: 0,
        dtt_name: 'Chọn địa điểm'
      },
      dataViPham: [],
      dataDiaDiem: [],
      dataThanhTra: {
        arrLoiViPham: [],
        arrDiem: []
      },
      imageData: [],
      dataDoanhThu: {
        arrVeNumber: [],
        doan_thu_khach: 0,
        doanh_thu_hang: 0,
        so_ve_tren_xe: 0,
        thuc_nop: 0,
        tong_chi_phi: 0,
        tong_danh_thu: 0,
        tong_so_ve: 0,
        treo_hang: 0,
        van_phong_ck: 0
      }
    };
  }

  componentDidMount() {
    this.getInfo(this.props.did_id);
    this.getData(this.props.did_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== null && nextProps.did_id !== this.props.did_id) {
      this.getInfo(nextProps.did_id);
      this.getData(nextProps.did_id);
    }
  }

  getData(did_id) {
    const params = {
      token: this.props.token,
      did_id: did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getDoanhThu(params, (e, d) => {
      if (d) {
        this.setState({
          dataDoanhThu: d
        });
      }
    });
  }

  getInfo(did_id) {
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: did_id
    };
    this.props.getInfoThanhTra(params, (e, d) => {
      if (d && d) {
        this.setState(
          {
            dataDiaDiem: [...this.state.dataDiaDiem, ...d.arrDiem],
            dataViPham: d.arrLoiViPham,
            dataThanhTra: { ...this.state.dataThanhTra, ...d }
          },
          () =>
            console.log(
              'dataDiaDiem',
              this.state.dataDiaDiem,
              this.state.dataThanhTra
            )
        );
      }

      if (e && e.message) {
        this.props.setToast(e.message.message, 'error');
      }
    });
  }

  renderItem(name, nameIcon, type, textId) {
    return (
      <TouchableOpacity style={styles.itemFilter} activeOpacity={1}>
        <IconMaterialCommunityIcons
          name={nameIcon}
          size={24}
          color={material.colorDark2}
        />
        <Text
          style={{
            ...styles.textNormal,
            paddingLeft: material.paddingSmall
          }}
        >
          {textId === 'laixe1' && 'Lái xe 1: '}
          {textId === 'laixe2' && 'Lái xe 2: '}
          {textId === 'tiepvien' && 'Tiếp viên: '} {name}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  searchDiaDiem(val) {
    // console.log(this.state.dataThanhTra.arrData);
    var search = new JsSearch.Search('dtt_name');
    search.addIndex('dtt_name');
    search.addDocuments(this.state.dataThanhTra.arrDiem);
    this.setState({
      dataDiaDiem: search.search(val.toString())
    });
    if (val.toString() === '') {
      this.setState({
        dataDiaDiem: this.state.dataThanhTra.arrDiem
      });
    }
  }

  renderItemViPham(name, nameIcon, type, textId) {
    return (
      <TouchableOpacity
        onPress={() =>
          type === 6
            ? this.setState({
                visibleViPham: true,
                type
              })
            : this.setState({
                visibleDiaDiem: true,
                type
              })
        }
        style={styles.itemFilter}
        activeOpacity={0.7}
      >
        <IconMaterialCommunityIcons
          name={nameIcon}
          size={24}
          color={material.colorDark2}
        />
        <Text
          style={{
            ...styles.textNormal,
            paddingLeft: material.paddingSmall
          }}
        >
          {name.xdm_name || name.dtt_name}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  submitForm(val) {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      arrPost: {
        xtt_tuyen_id: this.props.getThanhTraData.not_tuy_id,
        xtt_xe_id: this.props.getThanhTraData.id_xe,
        xtt_dtt_id: this.state.address.dtt_id,
        xtt_so_khach_tren_xe: this.state.dataDoanhThu.so_ve_tren_xe,
        xtt_so_khach_len: this.state.dataDoanhThu.so_ve_tren_xe,
        xtt_tien_khach: this.state.dataDoanhThu.doan_thu_khach,
        xtt_so_khach: this.state.dataDoanhThu.tong_so_ve,
        xtt_tien_hang: this.state.dataDoanhThu.doanh_thu_hang,
        xtt_lai_xe_1: this.props.getThanhTraData.idLaixe1,
        xtt_lai_xe_2: this.props.getThanhTraData.idLaixe2,
        xtt_tiep_vien: this.props.getThanhTraData.idTiepvien,
        xtt_noi_dung_vi_pham: val.noiDungViPham,
        xtt_loai_vi_pham: this.state.viPham.xdm_id,
        arrImage: this.state.imageData,
        xtt_thong_tin_khac: 'Kiem Tra',
        xtt_ghi_chu: val.ghiChu,
        xtt_lat: '',
        xtt_long: ''
      },
      did_id: this.props.did_id
    };

    if (this.state.address.dtt_id === 0) {
      return Alert.alert('Thông báo', 'Vui lòng chọn địa chỉ');
    }

    // console.log('params', params);
    this.props.editInfoThanhTra(params, (e, d) => {
      if (d) {
        this.props.setToast('Thành công');
        this.props.actionUpdateThanhTraView(new Date());
        this.props.resetTo('thanhTraView');
      }
      if (e && e.message) {
        this.props.setToast(e.message.message);
      }
      Keyboard.dismiss();
    });
    // console.log(val);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container style={styles.container}>
        <Content
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
        >
          {this.renderItem(
            this.props.getThanhTraData.tuy_ten,
            'road-variant',
            1,
            'tuyenxe'
          )}
          {this.renderItem(
            this.props.getThanhTraData.bien_kiem_soat,
            'bus',
            2,
            'xe'
          )}

          {this.renderItemViPham(this.state.address, 'map', 7, 'diaDiem')}

          {this.renderItem(
            this.props.getThanhTraData.laixe1,
            'account',
            3,
            'laixe1'
          )}
          {this.renderItem(
            this.props.getThanhTraData.laixe2,
            'account',
            4,
            'laixe2'
          )}
          {this.renderItem(
            this.props.getThanhTraData.tiepvien,
            'account',
            5,
            'tiepvien'
          )}

          <View style={styles.newInputContainer}>
            <Text
              style={{
                ...styles.textNormal,
                paddingRight: material.paddingNormal,
                flex: 2,
                marginTop: 4
              }}
            >
              Số khách tổng phơi
            </Text>
            <View style={{ ...styles.childItem, flex: 3 }}>
              <NumericInput
                value={numeral(this.state.dataDoanhThu.tong_so_ve).format(
                  '0,0'
                )}
                onChangeText={val =>
                  this.setState({
                    dataDoanhThu: {
                      ...this.state.dataDoanhThu,
                      tong_so_ve: val
                    }
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Tổng phơi"
              />
            </View>
          </View>
          <View style={styles.newInputContainer}>
            <Text
              style={{
                ...styles.textNormal,
                paddingRight: material.paddingNormal,
                flex: 2,
                marginTop: 4
              }}
            >
              Khách trên xe
            </Text>
            <View style={{ ...styles.childItem, flex: 3 }}>
              <NumericInput
                value={numeral(this.state.dataDoanhThu.so_ve_tren_xe).format(
                  '0,0'
                )}
                onChangeText={val =>
                  this.setState({
                    dataDoanhThu: {
                      ...this.state.dataDoanhThu,
                      so_ve_tren_xe: val
                    }
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Khách trên xe"
              />
            </View>
          </View>
          <View style={styles.newInputContainer}>
            <Text
              style={{
                ...styles.textNormal,
                paddingRight: material.paddingNormal,
                flex: 2,
                marginTop: 4
              }}
            >
              Tiền khách
            </Text>
            <View style={{ ...styles.childItem, flex: 3 }}>
              <NumericInput
                value={numeral(this.state.dataDoanhThu.doan_thu_khach).format(
                  '0,0'
                )}
                onChangeText={val =>
                  this.setState({
                    dataDoanhThu: {
                      ...this.state.dataDoanhThu,
                      doan_thu_khach: val
                    }
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Tiền khách"
              />
            </View>
          </View>

          <View style={styles.newInputContainer}>
            <Text
              style={{
                ...styles.textNormal,
                paddingRight: material.paddingNormal,
                flex: 2,
                marginTop: 4
              }}
            >
              Tiền hàng
            </Text>
            <View style={{ ...styles.childItem, flex: 3 }}>
              <NumericInput
                value={numeral(this.state.dataDoanhThu.doanh_thu_hang).format(
                  '0,0'
                )}
                onChangeText={val =>
                  this.setState({
                    dataDoanhThu: {
                      ...this.state.dataDoanhThu,
                      doanh_thu_hang: val
                    }
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Tiền hàng"
              />
            </View>
          </View>

          {this.renderItemViPham(
            this.state.viPham,
            'account-alert',
            6,
            'vipham'
          )}

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              onSubmitEditing={() => {
                this.ghiChu.focus();
              }}
              inputRef={e => (this.noiDungViPham = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Nội dung vi phạm'}
              name={'noiDungViPham'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
              IconIcomColor={material.colorDark2}
            />
          </View>

          <AddImage chooseImage={val => this.setState({ imageData: val })} />

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              // onSubmitEditing={() => {
              //   this.tienKhach.focus();
              // }}
              inputRef={e => (this.ghiChu = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Ghi chú'}
              name={'ghiChu'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
              IconIcomColor={material.colorDark2}
            />
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconIonicons
              name="ios-checkbox-outline"
              size={24}
              style={styles.iconCheck}
            />
            <Text style={styles.textNormal}>
              Tôi đồng ý với các điều khoản trên
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <IconIonicons
              name="ios-information-circle-outline"
              size={24}
              style={{ ...styles.iconCheck, color: 'red' }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ ...styles.textNormal, marginTop: -8, fontSize: 12 }}
              >
                Mày không thể đọc hết 200 dòng điều khoản trong vòng 10s được!
                Bớt xàm đi!!!! Nút 'Hoàn thành' sẽ bấm được trong vòng 10 phút!
              </Text>
            </View>
          </View> */}

          <Button
            onPress={handleSubmit(this.submitForm.bind(this))}
            style={styles.btn}
            success
          >
            <Text style={styles.textNormal}>Hoàn thành</Text>
          </Button>

          <ModalFilter
            disableSearch
            data={[
              {
                ...{
                  xdm_id: 0,
                  xdm_name: 'Bỏ chọn'
                }
              },
              ...this.state.dataViPham
            ]}
            onSearch={val => console.log('search', val)}
            selectedValue={val =>
              this.setState({
                viPham: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleViPham: val
              })
            }
            visible={this.state.visibleViPham}
          />

          <ModalFilter
            data={[
              {
                ...{
                  dtt_id: 0,
                  dtt_name: 'Bỏ chọn'
                }
              },
              ...this.state.dataDiaDiem
            ]}
            onSearch={val => this.searchDiaDiem(val)}
            selectedValue={val =>
              this.setState({
                address: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleDiaDiem: val
              })
            }
            visible={this.state.visibleDiaDiem}
          />
        </Content>
      </Container>
    );
  }
}

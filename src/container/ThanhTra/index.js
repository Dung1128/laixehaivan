import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, View, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { reduxForm, Field } from 'redux-form';
import * as JsSearch from 'js-search';
import AddImage from '../../components/AddImage';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFilter from './ModalFilter';
import * as commonActions from '../../store/actions/common';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as authSelectors from '../../store/selectors/auth';
import { InputField } from '../../elements/Form';
import material from '../../theme/variables/material';
import styles from './styles';
import styless from '../Register/styles';

@connect(
  state => ({
    initialValues: {
      lenhVanChuyen: 0,
      diaDiem: '',
      soKhachXe: 0,
      soKhachLen: 0,
      tienKhach: 0,
      soKhachPhoi: 0,
      tienHang: 0,
      noiDungViPham: '',
      ghiChu: ''
    },
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    dmVe: haivanSelectors.getDanhMucVe(state)
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
      visibleTuyenXe: false,
      visibleXe: false,
      visibleLaiXe1: false,
      visibleLaiXe2: false,
      visibleTiepVien: false,
      visibleTiepVien: false,
      visibleViPham: false,
      tuyenXe: {
        tuy_id: 0,
        tuy_name: 'Chọn tuyến xe'
      },
      xe: {
        xe_id: 0,
        xe_bien_kiem_soat: 'Chọn xe'
      },
      laixe1: {
        lx_id: 0,
        lx_name: 'Chọn lái xe 1'
      },
      laixe2: {
        lx_id: 0,
        lx_name: 'Chọn lái xe 2'
      },
      tiepVien: {
        tv_id: 0,
        tv_name: 'Tiếp viên'
      },
      viPham: {
        xdm_id: 0,
        xdm_name: 'Loại vi phạm'
      },
      dataTuyenXe: [],
      dataXe: [],
      dataLaiXe1: [],
      dataLaiXe2: [],
      dataTiepVien: [],
      dataViPham: [],
      dataThanhTra: {
        arrLaiXe: [],
        arrLoiViPham: [],
        arrTiepVien: [],
        arrTuyen: [],
        arrXe: []
      },
      imageData: [{ data: '' }]
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token
    };
    this.props.getInfoThanhTra(params, (e, d) => {
      if (d && d) {
        this.setState({
          dataThanhTra: d,
          dataTuyenXe: d.arrTuyen,
          dataXe: d.arrXe,
          dataLaiXe1: d.arrLaiXe,
          dataLaiXe2: d.arrLaiXe,
          dataTiepVien: d.arrTiepVien,
          dataViPham: d.arrLoiViPham
        });
      } else {
        this.props.setToast(e.message.message, 'error');
      }
    });
  }

  chooseCase(type) {
    switch (type) {
      case 1:
        return this.setState({
          visibleTuyenXe: true,
          type
        });
      case 2:
        return this.setState({
          visibleXe: true,
          type
        });

      case 3:
        return this.setState({
          visibleLaiXe1: true,
          type
        });
      case 4:
        return this.setState({
          visibleLaiXe2: true,
          type
        });
      case 5:
        return this.setState({
          visibleTiepVien: true,
          type
        });

      case 6:
        return this.setState({
          visibleViPham: true,
          type
        });

      default:
        return console.log('default');
    }
  }

  renderItem(item, nameIcon, type) {
    return (
      <TouchableOpacity
        style={styles.itemFilter}
        onPress={() => {
          this.chooseCase(type);
        }}
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
          {item.tuy_name ||
            item.xe_bien_kiem_soat ||
            item.lx_name ||
            item.tv_name ||
            item.xdm_name}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  searchTuyenXe(val) {
    var search = new JsSearch.Search('tuy_name');
    search.addIndex('tuy_name');
    search.addDocuments(this.state.dataThanhTra.arrTuyen);
    this.setState({
      dataTuyenXe: search.search(val)
    });

    if (val === '') {
      this.setState({
        dataTuyenXe: this.state.dataThanhTra.arrTuyen
      });
    }
    console.log(search.search(val));
  }

  searchLaiXe1(val) {
    var search = new JsSearch.Search('lx_name');
    search.addIndex('lx_name');
    search.addDocuments(this.state.dataThanhTra.arrLaiXe);
    this.setState({
      dataLaiXe1: search.search(val)
    });

    if (val === '') {
      this.setState({
        dataLaiXe1: this.state.dataThanhTra.arrLaiXe
      });
    }
    console.log(search.search(val));
  }

  searchLaiXe2(val) {
    var search = new JsSearch.Search('lx_name');
    search.addIndex('lx_name');
    search.addDocuments(this.state.dataThanhTra.arrLaiXe);
    this.setState({
      dataLaiXe2: search.search(val)
    });

    if (val === '') {
      this.setState({
        dataLaiXe2: this.state.dataThanhTra.arrLaiXe
      });
    }
    console.log(search.search(val));
  }

  searchTiepVien(val) {
    var search = new JsSearch.Search('tv_name');
    search.addIndex('tv_name');
    search.addDocuments(this.state.dataThanhTra.arrTiepVien);
    this.setState({
      dataTiepVien: search.search(val)
    });

    if (val === '') {
      this.setState({
        dataTiepVien: this.state.dataThanhTra.arrTiepVien
      });
    }
    console.log(search.search(val));
  }

  submitForm(val) {
    console.log(this.state.tuyenXe);
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      arrPost: {
        xtt_tuyen_id: this.state.tuyenXe.tuy_id,
        xtt_xe_id: this.state.xe.xe_id,
        xtt_so_lenh_van_chuyen: val.lenhVanChuyen,
        xtt_dia_diem: val.diaDiem,
        xtt_so_khach_tren_xe: val.soKhachXe,
        xtt_so_khach_len: val.soKhachLen,
        xtt_tien_khach: val.tienKhach,
        xtt_so_khach: val.soKhachPhoi,
        xtt_tien_hang: val.tienHang,
        xtt_lai_xe_1: this.state.laixe1.lx_id,
        xtt_lai_xe_2: this.state.laixe2.lx_id,
        xtt_tiep_vien: this.state.tiepVien.tv_id,
        xtt_noi_dung_vi_pham: val.noiDungViPham,
        xtt_loai_vi_pham: this.state.viPham.xdm_id,
        xtt_img: this.state.imageData[0].data,
        xtt_thong_tin_khac: 'Kiem Tra',
        xtt_lat: '',
        xtt_long: ''
      }
    };
    this.props.editInfoThanhTra(params, (e, d) => {
      if (d) {
        this.props.setToast('Thành công');
      }
      Keyboard.dismiss();
    });
    console.log(val);
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('state', this.state.tuyenXe);
    return (
      <Container style={styles.container}>
        <Content
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
        >
          {this.renderItem(this.state.tuyenXe, 'road-variant', 1, 'tuyenxe')}
          {this.renderItem(this.state.xe, 'bus', 2, 'xe')}

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              // onSubmitEditing={() => {
              //   this.diadiem.focus();
              // }}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Số lệnh vận chuyển *'}
              name={'lenhVanChuyen'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
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
              // onSubmitEditing={() => {
              //   this.soKhachTrenXe.focus();
              // }}
              inputRef={e => (this.diadiem = e)}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Địa điểm *'}
              name={'diaDiem'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
              IconIcomColor={material.colorDark2}
            />
          </View>

          {this.renderItem(this.state.laixe1, 'account', 3, 'laixe1')}
          {this.renderItem(this.state.laixe2, 'account', 4, 'laixe2')}
          {this.renderItem(this.state.tiepVien, 'account', 5, 'tiepvien')}

          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              // onSubmitEditing={() => {
              //   this.soKhachLen.focus();
              // }}
              inputRef={e => (this.soKhachTrenXe = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Số khách trên xe'}
              name={'soKhachXe'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
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
              // onSubmitEditing={() => {
              //   this.tienKhach.focus();
              // }}
              inputRef={e => (this.soKhachLen = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Số khách lên'}
              name={'soKhachLen'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
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
              // onSubmitEditing={() => {
              //   this.soKhachPhoi.focus();
              // }}
              inputRef={e => (this.tienKhach = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Tiền khách'}
              name={'tienKhach'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
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
              // onSubmitEditing={() => {
              //   this.tienHang.focus();
              // }}
              inputRef={e => (this.soKhachPhoi = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Số khách tổng phơi'}
              name={'soKhachPhoi'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
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
              // onSubmitEditing={() => {
              //   this.noiDungViPham.focus();
              // }}
              inputRef={e => (this.tienHang = e)}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Tiền hàng'}
              name={'tienHang'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              // IconIcom={'bus'}
              IconIcomColor={material.colorDark2}
            />
          </View>

          {this.renderItem(this.state.viPham, 'account-alert', 6, 'vipham')}

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

          <Button
            onPress={handleSubmit(this.submitForm.bind(this))}
            style={styles.btn}
            success
          >
            <Text style={styles.textNormal}>Hoàn thành</Text>
          </Button>

          <ModalFilter
            data={this.state.dataTuyenXe}
            onSearch={val => this.searchTuyenXe(val)}
            selectedValue={val =>
              this.setState({
                tuyenXe: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleTuyenXe: val
              })
            }
            visible={this.state.visibleTuyenXe}
          />

          <ModalFilter
            data={this.state.dataXe}
            selectedValue={val =>
              this.setState({
                xe: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleXe: val
              })
            }
            visible={this.state.visibleXe}
          />
          <ModalFilter
            data={this.state.dataLaiXe1}
            onSearch={val => this.searchLaiXe1(val)}
            selectedValue={val =>
              this.setState({
                laixe1: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleLaiXe1: val
              })
            }
            visible={this.state.visibleLaiXe1}
          />

          <ModalFilter
            data={this.state.dataLaiXe2}
            onSearch={val => this.searchLaiXe2(val)}
            selectedValue={val =>
              this.setState({
                laixe2: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleLaiXe2: val
              })
            }
            visible={this.state.visibleLaiXe2}
          />

          <ModalFilter
            data={this.state.dataTiepVien}
            onSearch={val => this.searchTiepVien(val)}
            selectedValue={val =>
              this.setState({
                tiepVien: val
              })
            }
            handleVisible={val =>
              this.setState({
                visibleTiepVien: val
              })
            }
            visible={this.state.visibleTiepVien}
          />

          <ModalFilter
            data={this.state.dataViPham}
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
        </Content>
      </Container>
    );
  }
}

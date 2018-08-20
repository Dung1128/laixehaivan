import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Container, Button, Item, Content, Input } from 'native-base';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import moment from 'moment';
import * as JsSearch from 'js-search';
import numeral from 'numeral';
import DateTime from '../../components/DateTime';
import NumericInput from '../../components/NumericInput';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';
import material from '../../theme/variables/material';
import platform from '../../theme/variables/platform';
import styles from './styles';
import ModalFilter from '../ThanhTra/ModalFilter';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class AddNhienLieu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataNCC: {
        arrData: []
      },
      visibleNhaCC: false,
      nhaCC: {
        ncc_id: 0,
        ncc_name: 'Chọn nhà cung cấp'
      },
      thanhTien: 0,
      km: 0,
      valDate: {
        name: moment(new Date()).format('DD-MM-YYYY')
      },
      litXang: 0,
      maCode: '',
      dataNhaCCNew: []
    };
  }

  componentDidMount() {
    this.listNCC();
  }

  listNCC() {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id
    };
    this.props.getNCC(params, (e, d) => {
      if (d && d.arrData) {
        this.setState({
          dataNCC: { ...this.state.dataNCC, ...d },
          dataNhaCCNew: d.arrData
        });
      }
    });
  }

  searchNhaCC(val) {
    var search = new JsSearch.Search('ncc_name');
    search.addIndex('ncc_name');
    search.addDocuments(this.state.dataNCC.arrData);
    this.setState({
      dataNhaCCNew: search.search(val)
    });

    if (val === '') {
      this.setState({
        dataNhaCCNew: this.state.dataNCC.arrData
      });
    }
  }

  chooseNhaCC() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            visibleNhaCC: true
          })
        }
        activeOpacity={0.6}
        style={styles.itemFilter}
      >
        <IconMaterialCommunityIcons
          name={'bus'}
          size={24}
          color={material.colorDark2}
        />
        <Text
          style={{
            ...styles.textNormal,
            paddingLeft: material.paddingSmall
          }}
        >
          {this.state.nhaCC.ncc_name}
        </Text>
      </TouchableOpacity>
    );
  }

  ModalNhaCC() {
    return (
      <ModalFilter
        data={[
          {
            ...{
              ncc_id: 0,
              ncc_name: 'Bỏ chọn'
            }
          },
          ...this.state.dataNhaCCNew
        ]}
        onSearch={val => this.searchNhaCC(val)}
        selectedValue={val =>
          this.setState({
            nhaCC: val
          })
        }
        handleVisible={val =>
          this.setState({
            visibleNhaCC: val
          })
        }
        visible={this.state.visibleNhaCC}
      />
    );
  }

  updateNhienLieu() {
    if (this.state.thanhTien <= 0) {
      return Alert.alert('Thông báo', 'Vui lòng nhập số tiền');
    }

    if (this.state.km <= 0) {
      return Alert.alert('Thông báo', 'Vui lòng nhập số km');
    }

    if (this.state.litXang <= 0) {
      return Alert.alert('Thông báo', 'Vui lòng nhập số lít');
    }
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id,
      xad_code: this.state.maCode,
      xad_km_ve: parseInt(this.state.km),
      xad_nha_cung_cap: this.state.nhaCC.ncc_id,
      xad_price: parseInt(this.state.thanhTien),
      xad_total: parseInt(this.state.litXang),
      xad_time: this.state.valDate.name
    };

    this.props.updateNhienLieu(params, (e, d) => {
      if (e && e.message) {
        this.props.setToast(e.message.message);
      }
      if (d) {
        this.props.setToast('Cập nhật thành công');
        this.props.actionUpdateListNhienLieu(new Date());
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {this.chooseNhaCC()}
          <View style={styles.rowItems}>
            <View style={styles.childItem}>
              <Text style={styles.textNormal}>Thời gian</Text>
            </View>
            <View style={{ ...styles.childItem, flex: 2, ...styles.dateTime }}>
              <DateTime
                defaultDateChose={new Date()}
                selectedOption={this.state.valDate}
                onChange={val => {
                  // console.log('val', val);
                  this.setState({ valDate: val });
                }}
              />
            </View>
          </View>
          <View style={styles.rowItems}>
            <View style={styles.childItem}>
              <Text style={styles.textNormal}>Mã</Text>
            </View>
            <View style={{ ...styles.childItem, flex: 2 }}>
              <Input
                onChangeText={val =>
                  this.setState({
                    maCode: val
                  })
                }
                style={styles.input}
                placeholder="Nhập mã"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.rowItems}>
            <View style={styles.childItem}>
              <Text style={styles.textNormal}>Số tiền</Text>
            </View>
            <View style={{ ...styles.childItem, flex: 2 }}>
              <NumericInput
                value={numeral(this.state.thanhTien).format('0,0')}
                onChangeText={val =>
                  this.setState({
                    thanhTien: val
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Tiền"
              />
            </View>
          </View>

          <View style={styles.rowItems}>
            <View style={styles.childItem}>
              <Text style={styles.textNormal}>Số km hiện tại</Text>
            </View>
            <View style={{ ...styles.childItem, flex: 2 }}>
              <NumericInput
                value={numeral(this.state.km).format('0,0')}
                onChangeText={val =>
                  this.setState({
                    km: val
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Km"
              />
            </View>
          </View>

          <View style={styles.rowItems}>
            <View style={styles.childItem}>
              <Text style={styles.textNormal}>Số lít</Text>
            </View>
            <View style={{ ...styles.childItem, flex: 2 }}>
              <Input
                onChangeText={val =>
                  this.setState({
                    litXang: val
                  })
                }
                keyboardType="numeric"
                style={styles.input}
                placeholder="Lít"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <Button
            onPress={() => this.updateNhienLieu()}
            success
            style={styles.btn}
          >
            <Text
              style={{
                ...styles.textNormal,
                color: material.badgeColor,
                fontWeight: 'bold'
              }}
            >
              Cập nhật
            </Text>
          </Button>

          {this.ModalNhaCC()}
        </Content>
      </Container>
    );
  }
}

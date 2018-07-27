import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as JsSearch from 'js-search';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import material from '../../theme/variables/material';
import { TimePickerField } from '../../elements/Form';
import styless from '../ThanhTra/styles';
import ModalFilter from './ModalFilter';
import styles from './styles';
import tuyenxe from '../ThanhTra/tuyenxe';
import xe from '../ThanhTra/xe';
import laixe from '../ThanhTra/laixe';

import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    initialValues: {
      fromDate: '',
      toDate: ''
    },
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
@reduxForm({
  form: 'add',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class AddBangDieuDo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleXe: false,
      visibleLaiXe1: false,
      visibleLaiXe2: false,
      visibleTiepVien: false,
      searchXe: [],
      searchLaiXe1: [],
      searchTiepVien: [],
      searchLaiXe2: [],
      xe: {
        id_xe: this.props.route.params.data.id_xe,
        xe_bien_kiem_soat:
          this.props.route.params.data.bien_kiem_soat === ''
            ? 'Chọn xe'
            : this.props.route.params.data.bien_kiem_soat,
        type: 2
      },
      laixe1: {
        lx_id: this.props.route.params.data.idLaixe1,
        lx_name:
          this.props.route.params.data.laixe1 === ''
            ? 'Chọn lái xe 1'
            : this.props.route.params.data.laixe1,
        type: 3
      },
      laixe2: {
        lx_id: this.props.route.params.data.idLaixe2,
        lx_name:
          this.props.route.params.data.laixe2 === ''
            ? 'Chọn lái xe 2'
            : this.props.route.params.data.laixe2,
        type: 4
      },
      tiepVien: {
        tv_id: this.props.route.params.data.idTiepvien,
        tv_name:
          this.props.route.params.data.tiepvien === ''
            ? 'Tiếp viên'
            : this.props.route.params.data.tiepvien,
        type: 5
      },
      dataInfo: {
        arrLaiXe: [],
        arrTiepVien: [],
        arrXe: []
      }
    };

    console.log(this.props.route.params.data.idLaixe2);
    console.log(this.props.route.params.data.idLaixe2);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id
    };
    this.props.getInfoDieuHanh(params, (e, d) => {
      this.setState({
        dataInfo: d,
        searchXe: d.arrXe,
        searchLaiXe1: d.arrLaiXe,
        searchLaiXe2: d.arrLaiXe,
        searchTiepVien: d.arrTiepVien
      });
    });
  }

  chosseCase(type) {
    switch (type) {
      case 2: {
        return this.setState({
          visibleXe: true,
          type
        });
      }
      case 3: {
        return this.setState({
          visibleLaiXe1: true,
          type
        });
      }
      case 4: {
        return this.setState({
          visibleLaiXe2: true,
          type
        });
      }
      case 5: {
        return this.setState({
          visibleTiepVien: true,
          type
        });
      }
      default:
        return console.log('default');
    }
  }

  renderItem(item, nameIcon, type) {
    return (
      <TouchableOpacity
        style={styless.itemFilter}
        onPress={() => this.chosseCase(type)}
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
          {item.lx_name || item.tv_name || item.xe_bien_kiem_soat}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  submitForm(val) {
    console.log(
      this.state.xe,
      this.state.laixe1,
      this.state.laixe2,
      this.state.tiepVien
    );

    if (val.fromDate === '' || val.toDate === '') {
      return this.props.setToast('Vui lòng cập nhật đầy đủ thông tin giờ');
    }

    if (this.state.xe.id_xe === 0) {
      return this.props.setToast('Vui lòng cập nhật đầy đủ thông tin xe');
    }
    if (this.state.laixe1.lx_id === 0) {
      return this.props.setToast('Vui lòng cập nhật đầy đủ thông tin lái xe');
    }
    if (this.state.laixe2.lx_id === 0) {
      return this.props.setToast('Vui lòng cập nhật đầy đủ thông tin lái xe');
    }
    if (this.state.tiepVien.tv_id === 0) {
      return this.props.setToast(
        'Vui lòng cập nhật đầy đủ thông tin tiếp viên'
      );
    }

    const params = {
      adm_id: this.props.profile.adm_id,
      token: this.props.token,
      did_id: this.props.did_id,
      xe_id: this.state.xe.xe_id,
      lx_id_1: this.state.laixe1.lx_id,
      lx_id_2: this.state.laixe2.lx_id,
      tv_id: this.state.tiepVien.tv_id,
      did_gio_xuat_ben_that: val.toDate.name,
      did_gio_dieu_hanh: val.fromDate.name
    };

    this.props.saveDieuHanh(params, (e, d) => {
      if (d) {
        this.props.resetTo('bangDieuDo');
      }
    });
  }

  searchXe(val) {
    var search = new JsSearch.Search('xe_bien_kiem_soat');
    search.addIndex('xe_bien_kiem_soat');
    search.addDocuments(this.state.dataInfo.arrXe);
    this.setState({
      searchXe: search.search(val)
    });

    if (val === '') {
      this.setState({
        searchXe: this.state.dataInfo.arrXe
      });
    }
    console.log(search.search(val));
  }

  searchLaiXe1(val) {
    var search = new JsSearch.Search('lx_name');
    search.addIndex('lx_name');
    search.addDocuments(this.state.dataInfo.arrLaiXe);
    this.setState({
      searchLaiXe1: search.search(val)
    });

    if (val === '') {
      this.setState({
        searchLaiXe1: this.state.dataInfo.arrLaiXe
      });
    }
    console.log(search.search(val));
  }

  searchLaiXe2(val) {
    var search = new JsSearch.Search('lx_name');
    search.addIndex('lx_name');
    search.addDocuments(this.state.dataInfo.arrLaiXe);
    this.setState({
      searchLaiXe2: search.search(val)
    });

    if (val === '') {
      this.setState({
        searchLaiXe2: this.state.dataInfo.arrLaiXe
      });
    }
    console.log(search.search(val));
  }

  searchTiepVien(val) {
    var search = new JsSearch.Search('tv_name');
    search.addIndex('tv_name');
    search.addDocuments(this.state.dataInfo.arrTiepVien);
    this.setState({
      searchTiepVien: search.search(val)
    });

    if (val === '') {
      this.setState({
        searchTiepVien: this.state.dataInfo.arrTiepVien
      });
    }
    console.log(search.search(val));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.textNormal}>Tuyến đi: Mỹ đình - Lào Cai</Text>
          {this.renderItem(this.state.xe, 'bus', 2)}
          <Field
            defaultValue={'Chọn giờ điều hành'}
            name="fromDate"
            component={TimePickerField}
            defaultDateChose={this.state.valDate}
          />
          <Field
            defaultValue={'Chọn giờ xuất bến thật'}
            name="toDate"
            component={TimePickerField}
            defaultDateChose={this.state.valDate}
          />
          {this.renderItem(this.state.laixe1, 'account', 3)}
          {this.renderItem(this.state.laixe2, 'account', 4)}
          {this.renderItem(this.state.tiepVien, 'account', 5)}
          <Button
            onPress={handleSubmit(this.submitForm.bind(this))}
            style={styless.btn}
            success
          >
            <Text style={styles.textNormal}>Hoàn thành</Text>
          </Button>
        </Content>

        <ModalFilter
          selectedValue={val => this.setState({ xe: val })}
          data={this.state.searchXe}
          onSearch={val => this.searchXe(val)}
          handleVisible={val =>
            this.setState({
              visibleXe: val
            })
          }
          visible={this.state.visibleXe}
        />

        <ModalFilter
          selectedValue={val => this.setState({ laixe1: val })}
          data={this.state.searchLaiXe1}
          onSearch={val => this.searchLaiXe1(val)}
          handleVisible={val =>
            this.setState({
              visibleLaiXe1: val
            })
          }
          visible={this.state.visibleLaiXe1}
        />

        <ModalFilter
          selectedValue={val => this.setState({ laixe2: val })}
          data={this.state.searchLaiXe2}
          onSearch={val => this.searchLaiXe2(val)}
          handleVisible={val =>
            this.setState({
              visibleLaiXe2: val
            })
          }
          visible={this.state.visibleLaiXe2}
        />

        <ModalFilter
          selectedValue={val => this.setState({ tiepVien: val })}
          data={this.state.searchTiepVien}
          onSearch={val => this.searchTiepVien(val)}
          handleVisible={val =>
            this.setState({
              visibleTiepVien: val
            })
          }
          visible={this.state.visibleTiepVien}
        />
      </Container>
    );
  }
}

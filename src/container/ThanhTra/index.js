import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { reduxForm, Field } from 'redux-form';
import AddImage from '../../components/AddImage';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFilter from './ModalFilter';
import { InputField } from '../../elements/Form';
import material from '../../theme/variables/material';
import styles from './styles';
import styless from '../Register/styles';
import tuyenxe from './tuyenxe';
import xe from './xe';
import laixe from './laixe';
import vipham from './vipham';

@reduxForm({
  form: 'maxe',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class ThanhTra extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tuyenXe: {
        id: 1,
        name: 'Chọn tuyến xe',
        type: 1
      },
      xe: {
        id: 1,
        name: 'Chọn xe',
        type: 2
      },
      laixe1: {
        id: 1,
        name: 'Chọn lái xe 1',
        type: 3
      },
      laixe2: {
        id: 1,
        name: 'Chọn lái xe 2',
        type: 4
      },
      tiepVien: {
        id: 1,
        name: 'Tiếp viên',
        type: 5
      },
      viPham: {
        id: 1,
        name: 'Loại vi phạm',
        type: 6
      }
    };
  }

  chooseData(type) {
    switch (type) {
      case 1:
        return tuyenxe;
      case 2:
        return xe;
      case 3: {
        laixe.map(item => {
          item.type = 3;
        });

        return laixe;
      }
      case 4: {
        laixe.map(item => {
          item.type = 4;
        });

        return laixe;
      }
      case 5: {
        laixe.map(item => {
          item.type = 5;
        });

        return laixe;
      }
      case 6:
        return vipham;
      default:
        return [];
    }
  }

  renderItem(item, nameIcon, type) {
    return (
      <TouchableOpacity
        style={styles.itemFilter}
        onPress={() =>
          this.setState({
            visible: true,
            type
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
            paddingLeft: material.paddingSmall
          }}
        >
          {item.name}{' '}
        </Text>
      </TouchableOpacity>
    );
  }

  checkSelectedValue(val) {
    console.log(val);
    switch (val.type) {
      case 1:
        return this.setState({ tuyenXe: val });
      case 2:
        return this.setState({ xe: val });
      case 3:
        return this.setState({ laixe1: val });
      case 4:
        return this.setState({ laixe2: val });
      case 5:
        return this.setState({ tiepVien: val });
      case 6:
        return this.setState({ viPham: val });
      default:
        return null;
    }
  }

  submitForm(val) {
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
              onSubmitEditing={() => {
                this.diadiem.focus();
              }}
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
              onSubmitEditing={() => {
                this.soKhachTrenXe.focus();
              }}
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
              onSubmitEditing={() => {
                this.soKhachLen.focus();
              }}
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
              onSubmitEditing={() => {
                this.tienKhach.focus();
              }}
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
              onSubmitEditing={() => {
                this.soKhachPhoi.focus();
              }}
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
              onSubmitEditing={() => {
                this.tienHang.focus();
              }}
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
              onSubmitEditing={() => {
                this.noiDungViPham.focus();
              }}
              inputRef={e => (this.tienHang = e)}
              keyboardType="numeric"
              returnKeyType="done"
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
              keyboardType="numeric"
              returnKeyType="done"
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

          <AddImage />

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
              keyboardType="numeric"
              returnKeyType="done"
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
            data={this.chooseData(this.state.type)}
            selectedValue={val => this.checkSelectedValue(val)}
            handleVisible={val =>
              this.setState({
                visible: val
              })
            }
            visible={this.state.visible}
          />
        </Content>
      </Container>
    );
  }
}

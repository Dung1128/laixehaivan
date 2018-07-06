import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { reduxForm, Field } from 'redux-form';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import material from '../../theme/variables/material';
import { TimePickerField } from '../../elements/Form';
import styless from '../ThanhTra/styles';
import ModalFilter from '../ThanhTra/ModalFilter';
import styles from './styles';
import tuyenxe from '../ThanhTra/tuyenxe';
import xe from '../ThanhTra/xe';
import laixe from '../ThanhTra/laixe';

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
      visible: false,
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
        style={styless.itemFilter}
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
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.textNormal}>Tuyến đi: Mỹ đình - Lào Cai</Text>
          {this.renderItem(this.state.xe, 'bus', 2)}
          <Field
            defaultValue={'Chọn giờ'}
            name="fromDate"
            component={TimePickerField}
            defaultDateChose={this.state.valDate}
          />
          <Field
            defaultValue={'Chọn giờ'}
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
          selectedValue={val => this.checkSelectedValue(val)}
          data={this.chooseData(this.state.type)}
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

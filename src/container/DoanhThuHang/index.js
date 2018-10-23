import React, { PureComponent } from 'react';
import { Text, View, Alert, Keyboard } from 'react-native';
import { Container, Button, Item, Content } from 'native-base';
import { connect } from 'react-redux';
import numeral from 'numeral';
import styles from './styles';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import platform from '../../theme/variables/platform';
import NumericInput from '../../components/NumericInput';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class DoanhThuHang extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      doanhThuHang: 0
    };
  }

  updateDoanhThu() {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      did_id: this.props.did_id,
      dt_hang: parseInt(this.state.doanhThuHang)
    };
    this.props.updateDoanhThuHang(params, (e, d) => {
      if (e && e.message.message) {
        Alert.alert('Thông báo', e.message.message);
      }
      Keyboard.dismiss();
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.body}>
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              Tổng doanh thu hàng
            </Text>
            <Item>
              <NumericInput
                value={numeral(this.state.doanhThuHang).format('0,0')}
                onChangeText={val =>
                  this.setState({
                    doanhThuHang: val
                  })
                }
                returnKeyType="next"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholderTextColor={platform.textHideGray}
                placeholder="Doanh thu"
              />
            </Item>
          </View>
          <Button
            onPress={() => this.updateDoanhThu()}
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
        </Content>
        <FabButton />
      </Container>
    );
  }
}

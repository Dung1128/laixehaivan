import React from 'react';
import {
  Container,
  Content,
  Text,
  Spinner,
  View,
  Button,
  Input,
  Item
} from 'native-base';
import { connect } from 'react-redux';

import FabButton from '../../components/FabButton';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';
import styles from './styles';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class HuongDanSuDung extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrChiPhi: []
    };
    this.chiPhi = [];
  }

  componentDidMount() {
    this.getListChiPhi();
  }

  renderItem(item, index) {
    this.chiPhi.push(item);

    return (
      <View style={styles.item}>
        <View style={styles.textInputContainer}>
          <Item>
            <Input
              onChangeText={val => {
                this.chiPhi[index].tcp_price = val;
              }}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Chi phí"
              defaultValue={
                item.tcp_price === 0 ? '0' : item.tcp_price.toString()
              }
              underlineColorAndroid="transparent"
            />
          </Item>
        </View>

        <View style={styles.textInputContainer}>
          <Item>
            <Input
              onChangeText={val => {
                this.chiPhi[index].tcp_intro = val;
              }}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Ghi chú"
              defaultValue={item.tcp_intro}
            />
          </Item>
        </View>
      </View>
    );
  }

  getListChiPhi() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getChiPhi(params, (e, d) => {
      if (d) {
        this.setState({
          arrChiPhi: d
        });
      }
    });
  }

  subMibChiPhi(val) {
    console.log(this.chiPhi);

    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id,
      arrChiPhi: this.chiPhi
    };

    this.props.saveChiPhi(params, (e, d) => {
      if (d) {
        this.props.setToast('Cập nhật dữ liệu thành công.');
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.arrChiPhi.map((item, index) => {
            console.log(item.name_danh_muc);
            return (
              <View>
                <Text style={styles.textNormal}>{item.name_danh_muc}</Text>
                {this.renderItem(item, index)}
              </View>
            );
          })}

          <Button
            onPress={this.subMibChiPhi.bind(this)}
            success
            style={styles.btn}
          >
            <Text>Xác nhận</Text>
          </Button>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

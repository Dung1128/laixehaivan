import React from 'react';
import { FlatList, RefreshControl, View, Alert } from 'react-native';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import ItemOffline from './ItemOffline';
import material from '../../theme/variables/material';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    getDataOffline: haivanSelectors.dataOffline(state),
    getConnect: haivanSelectors.saveConnect(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class HuyVe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      danhSachHuy: {
        arrData: []
      },
      isRefreshing: false,
      dataOffline: [],
      dataOfflineDif: []
    };
  }

  componentDidMount() {
    const newArray = [];
    const newArrayDif = [];
    this.props.getDataOffline.map((item, index) => {
      if (item.did_id === this.props.did_id) {
        newArray.push(item);
      } else {
        newArrayDif.push(item);
      }
    });

    this.setState({
      dataOffline: newArray,
      dataOfflineDif: newArrayDif
    });
  }

  componentWillReceiveProps(nextProps) {
    const newArray = [];
    const newArrayDif = [];
    if (
      this.props.getDataOffline !== nextProps.getDataOffline ||
      this.props.did_id !== nextProps.did_id
    ) {
      nextProps.getDataOffline.map((item, index) => {
        if (item.did_id === nextProps.did_id) {
          newArray.push(item);
        } else {
          newArrayDif.push(item);
        }
      });

      this.setState({
        dataOffline: newArray,
        dataOfflineDif: newArrayDif
      });
    }
  }

  onCreate(val) {
    const newData = [];
    Alert.alert(
      'Thông báo',
      'Bạn có đồng bộ vé không?',
      [
        { text: 'Không', onPress: () => {}, style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            this.props.insertVe(val, (e, d) => {
              if (d) {
                this.props.actionUpdateSDG(new Date());
                Alert.alert('Thông báo', 'Thành công');
                this.state.dataOffline.map((it, index) => {
                  if (
                    _.findIndex(this.state.dataOffline, {
                      bvv_number: val.bvv_number
                    }) !== index
                  ) {
                    newData.push(it);
                  }
                });
                this.props.subObjOffline([
                  ...newData,
                  ...this.state.dataOfflineDif
                ]);
              }
              if (
                this.props.getConnect &&
                e &&
                e.message.message.toString() ===
                  'Chỗ đã có người đặt. Bạn vui lòng chọn chỗ khác.'
              ) {
                Alert.alert(
                  'Thông báo',
                  'Chỗ đã có người đặt. Bạn vui lòng chọn chỗ khác.'
                );
                this.state.dataOffline.map((it, index) => {
                  if (
                    _.findIndex(this.state.dataOffline, {
                      bvv_number: val.bvv_number
                    }) !== index
                  ) {
                    newData.push(it);
                  }
                });
                this.props.subObjOffline([
                  ...newData,
                  ...this.state.dataOfflineDif
                ]);
              }

              if (!this.props.getConnect) {
                Alert.alert(
                  'Thông báo',
                  'Mạng internet đang không ổn định, vui lòng thử lại sau.'
                );
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  requestVe(item) {
    // console.log(item);
    const newData = [];
    if (
      _.findIndex(this.state.dataOffline, { bvv_number: item.bvv_number }) >= 0
    ) {
      this.props.insertVe(item, (e, d) => {
        if (d) {
          this.props.actionUpdateSDG(new Date());
          this.state.dataOffline.map((it, index) => {
            if (
              _.findIndex(this.state.dataOffline, {
                bvv_number: item.bvv_number
              }) !== index
            ) {
              newData.push(it);
            }
          });
          this.props.subObjOffline([...newData, ...this.state.dataOfflineDif]);
        }
      });
    }
  }

  renderItem({ item, index }) {
    return <ItemOffline requestVe={val => this.onCreate(val)} data={item} />;
  }

  render() {
    return (
      <Container style={{ alignItems: 'center' }}>
        {this.state.dataOffline &&
          this.state.dataOffline.length <= 0 && (
            <Text
              style={{
                fontSize: material.textNormal,
                marginTop: material.paddingNormal
              }}
            >
              Không có dữ liệu
            </Text>
          )}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ padding: material.paddingNormal }}
          keyExtractor={(item, index) => index}
          data={this.state.dataOffline}
          renderItem={this.renderItem.bind(this)}
          onEndReachedThreshold={material.platform === 'ios' ? 0 : 1}
          onMomentumScrollBegin={() => (this.isMoving = true)}
          onMomentumScrollEnd={() => (this.isMoving = false)}
          shouldRasterizeIOS={this.isMoving}
          renderToHardwareTextureAndroid={this.isMoving}
          // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          // refreshControl={
          //   <RefreshControl
          //     tintColor={material.primaryColor}
          //     refreshing={this.state.isRefreshing}
          //     onRefresh={this.refreshList.bind(this)}
          //   />
          // }
        />
        <FabButton />
      </Container>
    );
  }
}

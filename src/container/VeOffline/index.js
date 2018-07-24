import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
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
    getDataOffline: haivanSelectors.dataOffline(state)
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
      isRefreshing: false
    };
  }

  requestVe(item) {
    // console.log(item);
    const newData = [];
    if (
      _.findIndex(this.props.getDataOffline, { bvv_number: item.bvv_number }) >=
      0
    ) {
      this.props.insertVe(item, (e, d) => {
        if (d) {
          this.props.actionUpdateSDG(new Date());
          this.props.getDataOffline.map((it, index) => {
            if (
              _.findIndex(this.props.getDataOffline, {
                bvv_number: item.bvv_number
              }) !== index
            ) {
              newData.push(it);
            }
          });
          this.props.subObjOffline(newData);
        }
      });
    }
  }

  renderItem({ item, index }) {
    return <ItemOffline requestVe={() => this.requestVe(item)} data={item} />;
  }

  render() {
    return (
      <Container style={{ alignItems: 'center' }}>
        {this.props.getDataOffline &&
          this.props.getDataOffline.length <= 0 && (
            <Text
              style={{
                fontSize: material.textNormal,
                marginTop: material.paddingNormal
              }}
            >
              Không có dữ liêụ
            </Text>
          )}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ padding: material.paddingNormal }}
          keyExtractor={(item, index) => index}
          data={this.props.getDataOffline}
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

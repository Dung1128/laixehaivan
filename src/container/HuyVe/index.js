import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import ItemHuy from './ItemHuy';
import material from '../../theme/variables/material';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
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

  componentDidMount() {
    this.getList();
  }

  getList() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.listHuyVe(params, (e, d) => {
      if (d && d.arrData) {
        this.setState({
          danhSachHuy: d
        });
      }
    });
  }

  renderItem({ item, index }) {
    return <ItemHuy pending data={item} />;
  }

  refreshList() {
    this.getList();
  }

  render() {
    return (
      <Container style={{ alignItems: 'center' }}>
        {this.state.danhSachHuy.arrData &&
          this.state.danhSachHuy.arrData.length <= 0 && (
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
          data={this.state.danhSachHuy.arrData}
          renderItem={this.renderItem.bind(this)}
          onEndReachedThreshold={material.platform === 'ios' ? 0 : 1}
          onMomentumScrollBegin={() => (this.isMoving = true)}
          onMomentumScrollEnd={() => (this.isMoving = false)}
          shouldRasterizeIOS={this.isMoving}
          renderToHardwareTextureAndroid={this.isMoving}
          // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          refreshControl={
            <RefreshControl
              tintColor={material.primaryColor}
              refreshing={this.state.isRefreshing}
              onRefresh={this.refreshList.bind(this)}
            />
          }
        />
        <FabButton />
      </Container>
    );
  }
}

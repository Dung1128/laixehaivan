import React, { PureComponent } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import Item from './Item';

import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    getUpdateListNhienLieu: haivanSelectors.actionUpdateListNhienLieu(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class NhienLieu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nhienLieu: {
        arrData: []
      },
      isRefreshing: false
    };
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.getUpdateListNhienLieu !== this.props.getUpdateListNhienLieu &&
      nextProps.token !== null
    ) {
      this.getList();
    }
  }

  getList() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };
    this.props.getListNhienLieu(params, (e, d) => {
      if (d && d.arrData) {
        this.setState({
          nhienLieu: d
        });
      }
    });
  }

  renderItem({ item, index }) {
    return <Item data={item} />;
  }

  refreshList() {}

  render() {
    return (
      <Container style={{ alignItems: 'center' }}>
        {this.state.nhienLieu.arrData &&
          this.state.nhienLieu.arrData.length <= 0 && (
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
          data={this.state.nhienLieu.arrData}
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

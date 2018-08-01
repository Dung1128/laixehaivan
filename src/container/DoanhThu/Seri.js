import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import numeral from 'numeral';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './Item';

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
export default class Seri extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      noSeri: [],
      total: 0
    };
    this.offset = 0;
    this.isMoving = false;
  }

  componentDidMount() {
    this.getList();
  }

  renderItem({ item, index }) {
    return <Item data={item} />;
  }

  getList() {
    const newData = [];
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getSoDoGiuong(params, (e, d) => {
      if (d && d) {
        d.arrVeNumber.map(item => {
          if (item.arrVe.bvv_seri === 0) {
            newData.push(item.arrVe);
          }
        });

        this.setState({
          noSeri: newData
        });
      }
    });
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return <Loading position="bottom" />;
    }
    return <View />;
  }

  refreshList() {
    this.getList();
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.state.noSeri.length <= 0 && (
          <Text style={styles.textNormal}>Không có dữ liệu</Text>
        )}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ padding: material.paddingNormal }}
          keyExtractor={(item, index) => index}
          data={this.state.noSeri}
          renderItem={this.renderItem.bind(this)}
          onEndReachedThreshold={material.platform === 'ios' ? 0 : 1}
          onMomentumScrollBegin={() => (this.isMoving = true)}
          onMomentumScrollEnd={() => (this.isMoving = false)}
          shouldRasterizeIOS={this.isMoving}
          renderToHardwareTextureAndroid={this.isMoving}
          ListFooterComponent={this.renderFooter.bind(this)}
          // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          refreshControl={
            <RefreshControl
              tintColor={material.primaryColor}
              refreshing={this.state.isRefreshing}
              onRefresh={this.refreshList.bind(this)}
            />
          }
        />
      </Container>
    );
  }
}

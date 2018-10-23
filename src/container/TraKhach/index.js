import React from 'react';
import { FlatList, RefreshControl, View, Alert } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';

import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './Item';

const data = [];

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    getUpdateSDG: haivanSelectors.UpdateSDG(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class TraKhach extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      danhSachTraKhach: {
        arrData: []
      }
    };
    this.offset = 0;
    this.isMoving = false;
  }

  componentDidMount() {
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== null &&
      nextProps.getUpdateSDG !== this.props.getUpdateSDG
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

    this.props.traKhach(params, (e, d) => {
      if (d) {
        this.setState({ danhSachTraKhach: d });
      }
    });
  }

  xuongXe(item) {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn trả khách không?',
      [
        { text: 'Không', onPress: () => {}, style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            const params = {
              token: this.props.token,
              bvv_id: item.bvv_id,
              adm_id: this.props.profile.adm_id
            };
            this.props.xuongXe(params, (e, d) => {
              if (e && e.message && e.message.message) {
                Alert.alert('Thông báo', e.message.message);
              }
              if (d) {
                this.getList();
                this.props.actionUpdateSDG(new Date());
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  renderItem({ item, index }) {
    return <Item onPress={() => this.xuongXe(item)} data={item} />;
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
        {this.state.danhSachTraKhach.arrData &&
          this.state.danhSachTraKhach.arrData.length <= 0 && (
            <Text
              style={{
                ...styles.textNormal,
                marginTop: material.paddingNormal
              }}
            >
              Không có dữ liệu
            </Text>
          )}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={styles.contentContainerList}
          keyExtractor={(item, index) => index}
          data={this.state.danhSachTraKhach.arrData}
          renderItem={this.renderItem.bind(this)}
          onEndReachedThreshold={material.platform === 'ios' ? 0 : 1}
          onMomentumScrollBegin={() => (this.isMoving = true)}
          onMomentumScrollEnd={() => (this.isMoving = false)}
          shouldRasterizeIOS={this.isMoving}
          renderToHardwareTextureAndroid={this.isMoving}
          // ListFooterComponent={this.renderFooter.bind(this)}
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

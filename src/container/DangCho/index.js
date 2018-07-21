import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './ItemCho';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class DangCho extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      danhSachCho: {
        arrDanhSach: [],
        info: {},
        ten_giuong: []
      }
    };
    this.offset = 0;
    this.isMoving = false;
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

    this.props.danhSachCho(params, (e, d) => {
      if (d) {
        this.setState({ danhSachCho: d });
      }
    });
  }

  renderItem({ item, index }) {
    return (
      <Item
        pending
        data={item}
        giuong={
          _.find(this.state.danhSachCho.ten_giuong, {
            bvv_number: item.info.bvv_number
          }).name_sdg.sdgct_label_full
        }
        onPress={() => {
          this.props.saveChuyenDi(item.info.did_id);
          this.props.actionXepCho(true);
          this.props.resetTo('soDoGiuong', { dataCho: item });
        }}
      />
    );
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
    console.log('this.state.danhSachCho', this.state.danhSachCho);
    return (
      <Container style={styles.container}>
        {this.state.danhSachCho.arrDanhSach &&
          this.state.danhSachCho.arrDanhSach.length <= 0 && (
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
          data={this.state.danhSachCho.arrDanhSach}
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
        <FabButton />
      </Container>
    );
  }
}

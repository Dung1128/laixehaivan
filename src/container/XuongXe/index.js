import React from 'react';
import { Container, Content, Text } from 'native-base';
import { FlatList, RefreshControl, View } from 'react-native';
import FabButton from '../../components/FabButton';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import styles from '../TraKhach/styles';
import material from '../../theme/variables/material';
import Item from '../TraKhach/Item';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class XuongXe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      danhSachXuong: []
    };
  }

  componentDidMount() {
    this.getList();
  }

  renderItem({ item, index }) {
    return <Item pending data={item} />;
  }

  getList() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.listXuongXe(params, (e, d) => {
      if (d && d) {
        this.setState({
          danhSachXuong: d
        });
      }
    });
  }

  refreshList() {
    this.getList();
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.state.danhSachXuong &&
          this.state.danhSachXuong.length <= 0 && (
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
          data={this.state.danhSachXuong}
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

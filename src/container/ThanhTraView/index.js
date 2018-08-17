import React from 'react';
import { Container, Content, Text } from 'native-base';
import { FlatList, RefreshControl, View } from 'react-native';

import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import styles from '../TraKhach/styles';
import material from '../../theme/variables/material';
import Item from './itemThanhTra';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    getUpdateThanhTraView: haivanSelectors.actionUpdateThanhTraView(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ThanhTraView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      danhSachThanhTra: {
        arrData: []
      }
    };
  }

  componentDidMount() {
    this.getList();
  }

  renderItem({ item, index }) {
    return <Item data={item} index={index} />;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== null &&
      nextProps.getUpdateThanhTraView !== this.props.getUpdateThanhTraView
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

    this.props.getThanhTraChuyenDi(params, (e, d) => {
      if (d && d) {
        this.setState({
          danhSachThanhTra: d
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
        {this.state.danhSachThanhTra.arrData &&
          this.state.danhSachThanhTra.arrData.length <= 0 && (
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
          keyExtractor={(item, index) => index + '.'}
          data={this.state.danhSachThanhTra.arrData}
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
      </Container>
    );
  }
}

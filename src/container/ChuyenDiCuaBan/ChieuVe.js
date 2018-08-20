import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './item';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChieuVe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listChieuVe: [],
      isRefreshing: false
    };
    this.offset = 0;
    this.isMoving = false;
  }

  componentDidMount() {
    this.getList(moment(this.props.currentDate).format('DD-MM-YYYY'));
  }

  getList(time) {
    const newData = [];
    const params = {
      token: this.props.token,
      day: time,
      adm_id: this.props.profile.adm_id
    };

    this.props.listChuyenDi(params, (e, d) => {
      if (d) {
        d.arrItem.map((item, index) => {
          if (item.not_chieu_di === 2) {
            newData.push(item);
          }
        });

        this.setState({ listChieuVe: newData });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== null &&
      nextProps.currentDate !== this.props.currentDate
    ) {
      this.getList(moment(nextProps.currentDate).format('DD-MM-YYYY'));
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const newData = [];
  //   console.log('ve', nextProps.screenProps);
  //   nextProps.screenProps &&
  //     nextProps.screenProps.length > 0 &&
  //     nextProps.screenProps.map((item, index) => {
  //       if (item.not_chieu_di === 2) {
  //         newData.push(item);
  //       }
  //     });

  //   this.setState({ listChieuVe: newData });
  // }

  renderItem({ item, index }) {
    return <Item logo styleChuyenDi={item.color_loai_xe} data={item} />;
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return <Loading position="bottom" />;
    }
    return <View />;
  }

  refreshList() {
    this.getList(moment(this.props.currentDate).format('DD-MM-YYYY'));
  }

  _keyExtractor = (item, index) => item.did_id + '.';

  render() {
    const { listChieuVe } = this.state;

    return (
      <Container
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {listChieuVe &&
          listChieuVe.length <= 0 && <Text>Không có dữ liệu</Text>}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={styles.contentContainerList}
          keyExtractor={this._keyExtractor}
          data={listChieuVe}
          extraData={this.state}
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

import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import material from '../../theme/variables/material';
import styles from '../ChuyenDiCuaBan/styles';
import Item from '../ChuyenDiCuaBan/item';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    timeChuyenDi: haivanSelectors.getTimeChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class ChieuDi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listChieuDi: [],
      isRefreshing: false
    };
    this.offset = 0;
    this.isMoving = false;
  }

  componentDidMount() {
    console.log(this.props.timeChuyenDi);
    this.getList(moment(this.props.timeChuyenDi).format('DD-MM-YYYY'));
  }

  getList(time) {
    const params = {
      token: this.props.token,
      day: time,
      adm_id: this.props.profile.adm_id
    };

    this.props.lichDieuHanh(params, (e, d) => {
      this.newData = [];
      if (d) {
        d.arrItem.map((item, index) => {
          if (item.not_chieu_di === 1) {
            this.newData.push(item);
          }
        });

        this.setState({ listChieuDi: this.newData });
      }
    });
  }

  // componentDidMount() {

  //   const newData = [];

  //   this.props.screenProps &&
  //     this.props.screenProps.length > 0 &&
  //     this.props.screenProps.map((item, index) => {
  //       if (item.not_chieu_di === 1) {
  //         newData.push(item);
  //       }
  //     });

  //   this.setState({ listChieuDi: newData });
  // }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== null &&
      nextProps.timeChuyenDi !== this.props.timeChuyenDi
    ) {
      console.log('nextProps', nextProps.timeChuyenDi);
      this.getList(moment(nextProps.timeChuyenDi).format('DD-MM-YYYY'));
    }
    // const newData = [];

    // nextProps.screenProps &&
    //   nextProps.screenProps.length > 0 &&
    //   nextProps.screenProps.map((item, index) => {
    //     if (item.not_chieu_di === 1) {
    //       newData.push(item);
    //     }
    //   });

    // this.setState({ listChieuDi: newData });
  }

  renderItem({ item, index }) {
    return (
      <Item dieuHanh logo styleChuyenDi={item.color_loai_xe} data={item} />
    );
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return <Loading position="bottom" />;
    }
    return <View />;
  }

  refreshList() {
    this.getList(moment(this.props.timeChuyenDi).format('DD-MM-YYYY'));
  }
  _keyExtractor = (item, index) => item.did_id + '.';

  render() {
    const { listChieuDi } = this.state;

    return (
      <Container
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {listChieuDi &&
          listChieuDi.length <= 0 && <Text>Không có dữ liêụ</Text>}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={styles.contentContainerList}
          keyExtractor={this._keyExtractor}
          data={listChieuDi}
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

import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { FlatList, RefreshControl, View } from 'react-native';
import DateTimePicker from '../../components/DateTimePick';
import styles from './styles';
import moment from 'moment';
import material from '../../theme/variables/material';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';
import Item from '../ThanhTraView/itemThanhTra';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class LichSuThanhTra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      danhSachThanhTra: {
        arrData: []
      },
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false
    };
  }

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    this.getList();
  }

  getList() {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      day: moment(this.state.currentDate).format('DD-MM-YYYY')
    };
    this.props.getListThanhTra(params, (e, d) => {
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

  renderItem({ item, index }) {
    return <Item data={item} index={index} />;
  }

  render() {
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
          onChange={val => {
            this.setState({ currentDate: val.date }, () => this.getList());
          }}
        />

        {this.state.danhSachThanhTra.arrData &&
          this.state.danhSachThanhTra.arrData.length <= 0 && (
            <Text
              style={{
                ...styles.textNormal,
                marginTop: material.paddingNormal,
                textAlign: 'center'
              }}
            >
              Không có dữ liệu
            </Text>
          )}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={styles.contentContainerList}
          keyExtractor={(item, index) => index}
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

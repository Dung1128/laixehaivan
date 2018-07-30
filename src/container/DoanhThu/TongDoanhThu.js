import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './Item';
import numeral from 'numeral';
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
export default class TongDoanhThu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      dataDoanhThu: {
        arrVeNumber: [],
        tongDoanhThu: 0,
        tongDoanhThuTrenXe: 0,
        tongVe: 0,
        tongVeTrenXe: 0
      }
    };
    this.offset = 0;
    this.isMoving = false;
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.getDoanhThu(params, (e, d) => {
      if (d) {
        this.setState({
          dataDoanhThu: d
        });
      }
    });
  }

  renderItem({ item, index }) {
    return <Item pending data={item} />;
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return <Loading position="bottom" />;
    }
    return <View />;
  }

  refreshList() {}

  render() {
    return (
      <Container>
        <View style={styles.detailDoanhThu}>
          <Text style={styles.textNormal}>Tổng doanh thu :</Text>
          <Text style={styles.numberDoanhThu}>
            {numeral(this.state.dataDoanhThu.tongDoanhThu).format('0,0')} VNĐ
          </Text>
        </View>
        <View style={styles.detailDoanhThu}>
          <Text style={styles.textNormal}>Tổng doanh thu trên xe :</Text>
          <Text style={styles.numberDoanhThu}>
            {numeral(this.state.dataDoanhThu.tongDoanhThuTrenXe).format('0,0')}{' '}
            VNĐ
          </Text>
        </View>
        <View
          style={{
            ...styles.detailDoanhThu
          }}
        >
          <Text style={styles.textNormal}>Tổng số vé :</Text>
          <Text style={styles.textNormal}>
            {this.state.dataDoanhThu.tongVe} vé
          </Text>
        </View>
        <View
          style={{
            ...styles.detailDoanhThu
          }}
        >
          <Text style={styles.textNormal}>Số vé trên xe :</Text>
          <Text style={styles.textNormal}>
            {this.state.dataDoanhThu.tongVeTrenXe} vé
          </Text>
        </View>
        <View style={styles.detailDoanhThu}>
          <Text style={styles.textNormal}>Tổng chi phí :</Text>
          <Text style={styles.numberDoanhThu}>
            {numeral(this.state.dataDoanhThu.tongChiPhi).format('0,0')} VNĐ
          </Text>
        </View>
        <View
          style={{
            ...styles.detailDoanhThu,
            paddingBottom: material.paddingSmall
          }}
        >
          <Text style={styles.textNormal}>Còn lại :</Text>
          <Text style={styles.numberDoanhThu}>
            {numeral(
              this.state.dataDoanhThu.tongDoanhThu -
                this.state.dataDoanhThu.tongChiPhi
            ).format('0,0')}{' '}
            VNĐ
          </Text>
        </View>

        <FlatList
          style={{
            width: '100%'
          }}
          contentContainerStyle={{ padding: material.paddingNormal }}
          keyExtractor={(item, index) => index}
          data={this.state.dataDoanhThu.arrVeNumber}
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
        {/* <FabButton /> */}
      </Container>
    );
  }
}

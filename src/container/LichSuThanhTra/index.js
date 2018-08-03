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

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class LichSuThanhTra extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      danhSachThanhTra: []
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    const params = {
      token: this.props.token,
      adm_id: this.props.profile.adm_id,
      day: moment(new Date()).format('DD-MM-YYYY')
    };
    this.props.getListThanhTra(params);
  }

  refreshList() {
    this.getList();
  }

  renderItem({ item, index }) {
    return (
      <View>
        <Text>1</Text>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
          onChange={val => {
            this.setState({ currentDate: val.date });
          }}
        />
        <View style={styles.container}>
          {this.state.danhSachThanhTra &&
            this.state.danhSachThanhTra.length <= 0 && (
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
            data={this.state.danhSachThanhTra}
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
        </View>
      </Container>
    );
  }
}

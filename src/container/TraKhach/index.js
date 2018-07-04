import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import FabButton from '../../components/FabButton';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './Item';

const data = [
  {
    id: 1,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  },
  {
    id: 2,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  },
  {
    id: 3,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  },
  {
    id: 4,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  },
  {
    id: 5,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  },
  {
    id: 6,
    name: 'Nguyen van A',
    sdt: '0928312112',
    giuong: 'A1',
    address: 'Ha Noi'
  }
];
export default class TraKhach extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false
    };
    this.offset = 0;
    this.isMoving = false;
  }

  renderItem({ item, index }) {
    return <Item data={item} />;
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
      <Container style={styles.container}>
        <FlatList
          style={{ width: '100%', padding: material.paddingNormal }}
          contentContainerStyle={styles.contentContainerList}
          keyExtractor={(item, index) => index}
          data={data}
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

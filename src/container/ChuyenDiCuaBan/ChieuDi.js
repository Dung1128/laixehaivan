import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Container, Content, Text, Tabs, Tab } from 'native-base';
import material from '../../theme/variables/material';
import styles from './styles';
import Item from './item';

export default class ChieuDi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      isRefreshing: false,
      bottom: 0,
      loadingMore: false,
      getDataDay: this.props.saveDay
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
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.contentContainerList}
        keyExtractor={(item, index) => index}
        data={this.props.screenProps}
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
    );
  }
}

import React from 'react';
import {
  TouchableOpacity,
  Modal,
  LayoutAnimation,
  TextInput,
  FlatList
} from 'react-native';
import { Text, View, Button } from 'native-base';
import { connect } from 'react-redux';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';
import styles from './styles';

@connect(
  state => ({}),
  { ...commonActions },
  (stateProps, dispatchProps, ownProps) => ({
    initialValues: {
      enableReinitialize: true
    },
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  })
)
export default class Filter extends React.PureComponent {
  static propTypes = {
    handleVisible: PropTypes.func,
    data: PropTypes.array,
    selectedValue: PropTypes.func,
    onSearch: PropTypes.func
  };

  setVisible(val) {
    this.props.handleVisible(val);
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this.props.selectedValue(item);
          this.setVisible(false);
        }}
        style={styles.rowFilter}
      >
        <Text style={styles.textNormal}>
          {item.tuy_name ||
            item.xe_bien_kiem_soat ||
            item.lx_name ||
            item.tv_name ||
            item.xdm_name}
        </Text>
        {item.arrLoiChi &&
          item.arrLoiChi.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.selectedValue(item);
                this.setVisible(false);
              }}
              style={styles.viewChild}
            >
              <Text style={styles.textNormal}>{item.xdm_name}</Text>
            </TouchableOpacity>
          ))}
      </TouchableOpacity>
    );
  }

  render() {
    console.log('this.props.data', this.props.data);
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => console.log('')}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.setVisible(false)}
            >
              <IconIonicons name="ios-arrow-back" size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewInput}>
            <TextInput
              placeholder="Tìm kiếm"
              underlineColorAndroid="transparent"
              style={styles.TextInput}
              onChangeText={val => this.props.onSearch(val)}
            />
          </View>

          <FlatList
            contentContainerStyle={{ margin: material.paddingNormal }}
            keyExtractor={(item, index) => index}
            data={this.props.data}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      </Modal>
    );
  }
}

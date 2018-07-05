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
    data: PropTypes.array
  };

  setVisible(val) {
    this.props.handleVisible(val);
  }

  renderItem({ item }) {
    return (
      <View style={styles.rowFilter}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  render() {
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
            />
          </View>

          <FlatList
            contentContainerStyle={{ marginVertical: material.paddingNormal }}
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index}
            data={this.props.data}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      </Modal>
    );
  }
}

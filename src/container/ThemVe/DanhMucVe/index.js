import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import material from '../../../theme/variables/material';

const styles = {
  container: {
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -5,
    width: material.deviceWidth - 20
  }
};

export default class extends React.Component {
  render() {
    const { initialValue, onChangeText } = this.props;
    return (
      <Dropdown
        containerStyle={styles.container}
        itemTextStyle={{
          fontSize: material.textNormal
        }}
        itemPadding={10}
        fontSize={material.textSmall}
        pickerStyle={{ borderWidth: 0, marginTop: 25 }}
        value={initialValue}
        label={'Danh mục vé'}
        data={this.props.data}
        dropdownPosition={0.6}
        onChangeText={onChangeText}
      />
    );
  }
}

import React from 'react';
import { View, Text } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import material from '../../../theme/variables/material';

const styles = {
  container: {
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -15,
    width: material.deviceWidth / 2
  }
};

export default class extends React.Component {
  render() {
    const { initialValue, onChangeText } = this.props;
    return (
      <View style={{ marginTop: material.paddingSmall }}>
        <View style={{ flexDirection: 'row' }}>
          <IconFontAwesome
            name="list-alt"
            size={22}
            color={material.colorDark2}
          />
          <Text style={{ fontSize: material.textNormal, marginLeft: 10 }}>
            Danh mục vé
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Dropdown
            containerStyle={styles.container}
            itemTextStyle={{
              fontSize: material.textNormal
            }}
            itemPadding={10}
            fontSize={material.textSmall}
            pickerStyle={{ borderWidth: 0, marginTop: 25 }}
            value={initialValue}
            label={'Chọn danh mục'}
            data={this.props.data}
            dropdownPosition={0.6}
            onChangeText={onChangeText}
          />
          <Text style={{ fontSize: material.textSmall }}>
            Seri: {this.props.seri}
          </Text>
        </View>
      </View>
    );
  }
}

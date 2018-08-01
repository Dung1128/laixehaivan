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
      <View
        style={{
          marginTop: material.paddingSmall,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            // marginTop: material.paddingSmall,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <IconFontAwesome
              name="list-alt"
              size={22}
              color={material.colorDark2}
            />
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
          </View>
        </View>
        <View>
          <Text numberOfLines={1} style={{ fontSize: material.textNormal }}>
            Seri: {this.props.seri}
          </Text>
        </View>
      </View>
    );
  }
}

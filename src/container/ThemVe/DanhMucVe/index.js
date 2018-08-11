import React from 'react';
import { View, Text } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import material from '../../../theme/variables/material';

import * as commonActions from '../../../store/actions/common';
import * as haivanActions from '../../../store/actions/haivan';
import * as haivanSelectors from '../../../store/selectors/haivan';
import * as authSelectors from '../../../store/selectors/auth';

const styles = {
  container: {
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -15,
    width: material.deviceWidth / 2
  }
};

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state),
    getConnect: haivanSelectors.saveConnect(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.danhMucVe(this.props.price);
  }

  // this.props.dmVe.dataDM.map(item =>
  //   this.danhMuc.push({ ...item, label: item.bvd_ma_ve, value: item.bvd_id })
  // );

  componentWillReceiveProps(nextProps) {
    if (nextProps.price !== this.props.price) {
      console.log(nextProps.price);
      this.danhMucVe(nextProps.price);
    }
  }

  danhMucVe(price) {
    this.danhMuc = [];
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id,
      price: price
    };

    this.props.getDanhMucVe(params, (e, d) => {
      if (d) {
        d.dataDM.map(item =>
          this.danhMuc.push({
            ...item,
            label: item.bvd_ma_ve,
            value: item.bvd_id
          })
        );
      }

      this.setState({
        dataDanhMuc: [{ ...{ label: 'Bỏ chọn', value: 0 } }, ...this.danhMuc]
      });
    });
  }

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
              data={this.state.dataDanhMuc}
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

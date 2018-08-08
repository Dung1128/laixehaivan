import { StyleSheet } from 'react-native';

import material from '../../theme/variables/material';

export default {
  container: {
    flex: 1,
    padding: material.paddingNormal
  },
  viewInput: {
    paddingVertical: material.paddingNormal
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: material.colorHeader,
    padding: material.paddingNormal - 4
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: material.paddingNormal
  },
  textLogin: {
    color: material.badgeColor,
    fontWeight: 'bold'
  },
  footer: {
    width: material.deviceWidth - 32,
    alignItems: 'center',
    paddingTop: material.paddingSmall
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: material.paddingSmall + 4,
    borderBottomColor: material.colorBorder,
    paddingBottom: material.paddingSmall,
    marginVertical: material.paddingSmall
  },
  content: {},
  inputLogin: {
    paddingHorizontal: material.paddingSmall,
    width: '100%',
    height: '100%'
  },
  drawerImage: {
    width: 100,
    height: 100
  },
  viewLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: material.deviceHeight / 18
  }
};

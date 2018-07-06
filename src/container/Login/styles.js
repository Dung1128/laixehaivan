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
    width: material.deviceWidth / 2.5,
    alignItems: 'center',
    backgroundColor: material.inputSuccessBorderColor,
    padding: material.paddingNormal - 4
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textLogin: {
    color: material.badgeColor
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
    paddingBottom: material.paddingSmall
  },
  content: {
    paddingTop: material.deviceHeight / 5
  },
  inputLogin: {
    paddingHorizontal: material.paddingSmall,
    width: '100%',
    height: '100%'
  }
};

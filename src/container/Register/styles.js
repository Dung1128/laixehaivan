import { StyleSheet } from 'react-native';

import material from '../../theme/variables/material';

export default {
  container: {
    flex: 1,
    margin: material.paddingNormal
  },
  viewInput: {
    paddingVertical: material.paddingNormal
  },
  button: {
    width: material.deviceWidth - 32,
    alignItems: 'center',
    backgroundColor: material.inputSuccessBorderColor,
    padding: material.paddingNormal - 4
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: material.paddingNormal
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
    paddingVertical: material.paddingSmall + 4,
    borderBottomColor: material.colorBorder
  },
  content: {
    paddingTop: material.deviceHeight / 10
  },
  inputLogin: {
    paddingHorizontal: material.paddingSmall,
    width: '100%',
    height: '100%'
  },
  //form
  textInputContainer: {
    width: '100%',
    marginBottom: 10
  },
  input: {
    fontSize: material.textSmall
  }
};

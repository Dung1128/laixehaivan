import { StyleSheet } from 'react-native';

import material from '../../theme/variables/material';

export default {
  container: {
    flex: 1,
    padding: material.paddingNormal,
    backgroundColor: material.colorDark
  },

  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: material.colorHeader1,
    padding: material.paddingNormal - 4,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: material.paddingHeader
  },
  textLogin: {
    color: material.colorDark,
    fontWeight: 'bold',
    fontSize: material.textNormal
  },

  drawerImage: {
    width: 140,
    height: 140
  },
  viewLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: material.deviceHeight / 18
  },
  textInput: {
    backgroundColor: material.inputBorderColor,
    paddingLeft: material.paddingSmall,
    backgroundColor: material.colorDark
  },
  input: {
    flex: 1,
    fontSize: material.textNormal,
    color: material.inputBorderColor,
    width: '100%',
    height: '100%'
  },
  textInputContainer: {
    flex: 1,
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: material.inputBorderColor,
    marginTop: material.paddingNormal,
    alignItems: 'center',
    paddingHorizontal: material.paddingSmall,
    flexDirection: 'row'
  },
  icon: {
    color: material.inputBorderColor,
    paddingRight: material.paddingSmall
  }
};

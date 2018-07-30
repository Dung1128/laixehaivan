import { Platform } from 'react-native';
import material from '../../theme/variables/material';

export default {
  container: {},
  footerIcon: {
    color: '#808080',
    paddingTop: 2,
    marginLeft: 5,
    marginRight: 5
    // fontSize: 18
  },
  get footerIconActive() {
    return { ...this.footerIcon, color: material.primaryColor };
  },
  button: {
    height: '100%',
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: material.colorHeader,
    elevation: 0,
    shadowOffset: null,
    shadowOpacity: 0,
    shadowRadius: 0
  },

  buttonLeft: {
    borderTopLeftRadius: material.borderRadiusBase,
    borderBottomLeftRadius: material.borderRadiusBase,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },

  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: material.borderRadiusBase,
    borderBottomRightRadius: material.borderRadiusBase,
    borderLeftWidth: 0
  },

  buttonMiddle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
    // borderLeftWidth: 0.5,
    // borderRightWidth: 0.5
  },

  label: {
    fontSize: material.textSmall,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 0 : -5,
    marginTop: Platform.OS === 'ios' ? 0 : -5
  },
  footerContainer: {
    height: material.deviceHeight * 0.045,
    borderRadius: material.borderRadiusBase,
    marginTop: material.paddingNormal,
    width: material.deviceWidth - 32,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRightWidth: 1,
    marginBottom: material.paddingNormal
  }
};

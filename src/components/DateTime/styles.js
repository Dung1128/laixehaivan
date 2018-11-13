import { Platform, PixelRatio } from 'react-native';
import material from '../../theme/variables/material';

export default {
  dropdownContainer: {
    flexDirection: 'column',
    borderRadius: material.borderRadiusBase,
    flex: 1,
    overflow: null
  },
  dropdownHeader: {
    backgroundColor: material.textInputBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: material.colorBorder,
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 5
  },
  dropdownIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    elevation: 0,
    shadowOffset: null,
    shadowOpacity: 0,
    paddingLeft: 45,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  icon: {
    color: material.colorDark,
    fontSize: 20
    //width: material.deviceHeight * 0.03,
  },
  dropdownSelectedValue: {
    color: material.textInputColor,
    fontSize: material.deviceWidth * 0.035
  },
  dropdownTextContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOffset: null,
    shadowOpacity: 0
    // width: '60%'
  },
  mainValueText: {
    fontSize: material.textNormal,
    color: material.primaryColor
  }
};

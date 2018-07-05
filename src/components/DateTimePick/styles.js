import { Platform, PixelRatio } from 'react-native';
import material from '../../theme/variables/material';

export default {
  dropdownContainer: {
    marginHorizontal: material.paddingNormal
  },
  dropdownHeader: {
    width: '100%',
    // paddingHorizontal: material.paddingNormal,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: material.paddingSmall
  },
  textTitle: {
    fontSize: material.textLarge,
    fontWeight: 'bold'
  },
  dropdown: {
    color: material.primaryColor,
    fontSize: 20
  },
  textNormal: {
    fontSize: material.textNormal
  },
  get textSmall() {
    return { ...this.textNormal, fontSize: material.textSmall };
  }
};

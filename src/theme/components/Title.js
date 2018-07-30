import { Platform } from 'react-native';

import variable from './../variables/platform';
import material from '../variables/material';

export default (variables = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontfamily,
    color: 'black',
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
    textAlign: 'center'
  };

  return titleTheme;
};

import { StyleSheet, PixelRatio } from 'react-native';
import material from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    marginTop: material.paddingSmall,
    marginBottom: material.paddingSmall,
    alignSelf: 'center'
  },
  xContainer: {
    paddingLeft: material.paddingSmall,
    paddingRight: material.paddingSmall,
    alignSelf: 'center'
  },
  x: {
    fontSize: material.textNormal,
    color: '#fff'
  }
});

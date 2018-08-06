import { StyleSheet, Platform } from 'react-native';
import material from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    backgroundColor: material.colorHeader,
    paddingRight: 0,
    // marginTop: Platform.OS === 'ios' ? 22 : 0,
    height: 64,
    paddingTop: 0
  },
  searchContainer: {
    backgroundColor: '#e1e1e1',
    borderColor: 'transparent',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: -20,
    width: material.deviceWidth / 2 + 60,
    height: 30,
    flexDirection: 'row'
  },
  searchIcon: {
    color: material.backgroundColor,
    paddingRight: 0
  },
  menuIcon: {
    marginLeft: 10,
    color: 'black'
  },
  uploadIcon: {
    fontSize: 17,
    marginRight: -3
  },
  searchInput: {
    height: material.platform === 'ios' ? 30 : 50,
    color: '#222'
  },
  rowIconContainer: {
    flexDirection: 'row'
  },
  badgeContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  icon: {
    fontSize: 20
  },
  title: {
    color: 'black',
    fontSize: material.textTitle,
    alignItems: 'center'
  },
  textNormal: {
    fontSize: material.textNormal,
    color: 'black'
  },
  textTitle: {
    fontSize: material.textTitle
  }
});

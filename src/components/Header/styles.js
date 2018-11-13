import { StyleSheet, Platform } from 'react-native';
import material from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    backgroundColor: material.colorDark,
    height: material.deviceHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: material.paddingNormal
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
    // marginLeft: 10,
    color: material.badgeColor
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
    color: material.badgeColor,
    fontSize: material.textTitle,
    alignItems: 'center'
  },
  textNormal: {
    fontSize: material.textNormal,
    color: material.badgeColor
  },
  textTitle: {
    fontSize: material.textTitle
  },
  left: {
    flex: 0.5,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  get right() {
    return { ...this.left, alignItems: 'flex-end' };
  },
  body: {
    flex: 1.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pd: {
    paddingLeft: 0,
    paddingRight: 0
  }
});

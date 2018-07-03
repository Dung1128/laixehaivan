import { StyleSheet, PixelRatio, Platform } from 'react-native';
import material from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    // borderTopColor: material.colorBorder,
    // backgroundColor: 'white',
    width: '100%',
    height: material.deviceWidth * 0.15,
    borderTopColor: material.textGrey
  },
  footerIcon: {
    color: material.tabBarTextColor,
    paddingTop: 2,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16
  },
  get footerIconActive() {
    return { ...this.footerIcon, color: material.tabBarActiveTextColor };
  },
  button: {
    // move to bottom and stretch to height
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center'
  },
  badgeIcon: {
    marginTop: -18
  },
  badgeText: {
    left: 18,
    top: -2
  },
  icon: {
    color: material.textGrey,
    fontSize: 22
    // fontSize: material.textTitle
  },
  text: {
    fontSize: material.textNormal
  },
  tabButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    height: '100%',
    width: '90%',
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0
    // borderRightWidth: 1,
    // borderRightColor: material.colorBorder
    // paddingLeft: 5,
    // paddingRight: 5,
    // borderColor: '#fff'
  },
  textSmall: {
    fontSize: material.textBadge,
    color: material.badgeColor,
    alignSelf: 'center',
    paddingTop: 0
  },
  viewBadge: {
    backgroundColor: material.primaryColor,
    paddingHorizontal: 3,
    // paddingVertical: 2,
    borderRadius: 10,
    position: 'absolute',
    left: material.deviceWidth / 5 - material.deviceWidth / 10,
    top: 3,
    alignContent: 'center',
    justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
    width: 20,
    height: 20,
    alignSelf: 'center',
    paddingTop: 0
  }
});

import { StyleSheet } from 'react-native';
import material from '../../theme/variables/material';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: material.badgeColor
  },

  drawerCover: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
    height: 100,
    // position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0
    // flexDirection: 'column'
  },
  drawerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20
  },
  listItemContainer: {
    marginBottom: 20
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: material.platform === 'android' ? 7 : 5
  },

  sidebarIcon: {
    fontSize: 21,
    color: material.colorDark2,
    lineHeight: material.platform === 'android' ? 21 : 25,
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  text: {
    fontWeight: material.platform === 'ios' ? '400' : '300',
    color: material.colorDark2
  },
  icon: {
    fontSize: 20,
    color: material.colorDark2,
    justifyContent: 'center',
    width: 25,
    alignSelf: 'center'
  },
  editContainer: {
    flexDirection: 'row',
    paddingLeft: 35
  },
  iconEdit: {
    marginLeft: 10,
    marginTop: -10,
    color: material.colorDark2,
    width: 25,
    height: 25
  },
  iconText: {
    fontSize: material.textNormal,
    fontWeight: '400',
    textAlign: 'center',
    color: material.colorDark2,
    marginLeft: 20
  },
  iconTextLast: {
    color: '#eee',
    marginLeft: 20,
    fontSize: material.textNormal,
    textAlign: 'center'
  },
  footer: {
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0
  }
});

import material from '../../theme/variables/material';

export default {
  drawerImage: {
    width: material.deviceWidth / 2.5,
    height: 100,
    marginTop: 5,
    marginBottom: material.paddingNormal,
    borderRadius: 8,
    // marginHorizontal: 8,

    // overflow: 'hidden',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  modal: {
    width: material.deviceWidth,
    height: material.deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
  },
  icon: {
    color: material.colorSubtitle,
    fontSize: material.textLarge
  },
  buttonDelete: {
    backgroundColor: material.colorDark2,
    position: 'absolute',
    zIndex: 99,
    top: 10,
    right: 15,
    alignContent: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.7,
    alignItems: 'center'
  }
};

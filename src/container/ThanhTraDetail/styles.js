import material from '../../theme/variables/material';

export default {
  textNormal: {
    fontSize: material.textNormal
  },
  container: {
    padding: material.paddingNormal
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewImage: {
    marginVertical: material.paddingSmall
  },
  drawerImage: {
    width: material.deviceWidth / 2.5,
    height: 100,
    borderRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  }
};

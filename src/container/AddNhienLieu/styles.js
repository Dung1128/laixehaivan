import material from '../../theme/variables/material';

export default {
  itemFilter: {
    marginBottom: 5,
    height: material.deviceHeight * 0.07,
    borderRadius: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -2
  },
  container: {
    padding: material.paddingNormal
  },
  rowItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: material.paddingSmall,
    alignItems: 'center'
  },
  input: {
    fontSize: material.textNormal,
    borderBottomWidth: 1,
    borderBottomColor: material.colorBorder
  },
  childItem: {
    flex: 1
  },
  dateTime: {
    borderBottomWidth: 1,
    borderBottomColor: material.colorBorder,
    paddingVertical: material.paddingSmall + 2
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: material.paddingLarge
  }
};

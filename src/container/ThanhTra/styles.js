import { Platform } from 'react-native';
import material from '../../theme/variables/material';

export default {
  container: {
    padding: material.paddingNormal
  },
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
  textNormal: {
    fontSize: material.textNormal
  },
  //modal
  modal: {
    // backgroundColor: 'rgba(0,0,0,.3)',
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: material.paddingNormal,
    marginTop: Platform.OS === 'ios' ? 22 : 0
    // paddingHorizontal: material.paddingNormal
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: material.paddingSmall,
    marginBottom: material.paddingNormal
  },
  header: {
    // width: '100%',
    height: 50,
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginHorizontal: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal
  },
  viewInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: material.paddingSmall,
    borderColor: material.colorBorder,
    height: 45,
    justifyContent: 'center',
    marginHorizontal: material.paddingNormal
  },
  TextInput: {
    width: '100%',
    height: '100%'
  },
  rowFilter: {
    borderBottomWidth: 1,
    borderBottomColor: material.colorBorder,
    paddingVertical: material.paddingSmall
  },
  viewCamera: {
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    width: '30%',
    borderColor: material.colorBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNormal: {
    fontSize: material.textNormal,
    paddingVertical: material.paddingSmall
  },
  viewChild: {
    paddingHorizontal: material.paddingNormal
  }
};

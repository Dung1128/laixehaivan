import { Platform } from 'react-native';
import material from '../../theme/variables/material';

export default {
  itemRow: {
    borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: material.colorBorder,
    marginVertical: 2,
    height: 150,
    padding: material.paddingSmall
  },
  textNormal: {
    paddingBottom: material.paddingSmall,
    fontWeight: 'bold',
    fontSize: material.textNormal
  },
  card: {
    paddingBottom: material.paddingSmall,
    padding: material.paddingSmall
  },
  //modal
  modal: {
    // backgroundColor: 'rgba(0,0,0,.3)',
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 10,
    marginTop: Platform.OS === 'ios' ? 22 : 0,
    paddingHorizontal: material.paddingNormal
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: material.paddingSmall
  },
  header: {
    width: '100%',
    height: 50,
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  textNormal: {
    fontSize: material.textNormal
  },
  textSmall: {
    fontSize: material.textSmall
  },
  headerVe: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

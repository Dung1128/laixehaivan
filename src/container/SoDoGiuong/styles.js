import { Platform } from 'react-native';
import material from '../../theme/variables/material';

export default {
  itemRow: {
    borderWidth: 1,
    borderColor: material.colorBorder,
    marginVertical: 2,
    minHeight: 150,
    padding: material.paddingSmall
  },
  textNormal: {
    paddingBottom: material.paddingSmall,
    fontWeight: 'bold',
    fontSize: material.textNormal
  },
  card: {
    // paddingBottom: material.paddingSmall,
    padding: material.paddingSmall,
    borderWidth: 1,
    borderColor: material.colorBorder
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
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
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
  },
  cardView: {
    padding: material.paddingSmall
  },
  itemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: material.paddingSmall
  }
};

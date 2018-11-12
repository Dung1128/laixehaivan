import material from '../../theme/variables/material';

export default {
  contentContainerList: {
    paddingHorizontal: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textSmall
  },
  card: {
    padding: material.paddingSmall,
    borderRadius: 5,
    marginBottom: material.paddingSmall,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  note: {
    width: 16,
    height: 16,
    backgroundColor: material.daLenXe
  },
  rowNote: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSmall: {
    fontSize: material.textSmall
  },
  drawerImage: {
    width: 50,
    height: 50
  },
  styleTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 36,
    alignItems: 'center',
    marginVertical: material.paddingNormal,
    paddingHorizontal: material.paddingNormal
  },
  itemRow: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: material.colorHeader
  },
  get itemActive() {
    return { ...this.itemRow, backgroundColor: material.colorHeader };
  },
  get itemActiveText() {
    return {
      ...this.textNormal,
      color: material.badgeColor,
      fontWeight: 'bold'
    };
  }
};

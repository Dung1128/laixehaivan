import material from '../../theme/variables/material';

export default {
  contentContainerList: {},

  card: {
    padding: material.paddingSmall,
    borderRadius: 5,
    marginBottom: material.paddingSmall
  },
  note: {
    width: 16,
    height: 16,
    backgroundColor: material.colorPending
  },
  rowNote: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textNormal: {
    fontSize: material.textNormal
  },
  detailDoanhThu: {
    paddingHorizontal: material.paddingNormal,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  get numberDoanhThu() {
    return {
      ...this.textNormal,
      fontWeight: 'bold',
      color: material.colorComplete
    };
  },
  container: {
    alignItems: 'center'
  },
  totalSeri: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: material.paddingNormal + 4,
    paddingBottom: material.paddingSmall
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
    borderColor: material.colorHeader1
  },
  get itemActive() {
    return { ...this.itemRow, backgroundColor: material.colorHeader1 };
  },
  get itemActiveText() {
    return {
      ...this.textNormal,
      color: material.colorDark,
      fontWeight: 'bold'
    };
  },
  borderLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  borderRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  }
};

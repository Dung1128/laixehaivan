import material from '../../theme/variables/material';

export default {
  contentContainerList: {},
  textNormal: {
    fontSize: material.textSmall
  },
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
  }
};

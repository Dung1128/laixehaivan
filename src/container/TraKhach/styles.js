import material from '../../theme/variables/material';

export default {
  container: {
    alignItems: 'center'
  },
  contentContainerList: {
    padding: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal
  },
  card: {
    padding: material.paddingSmall,
    borderRadius: 5,
    marginBottom: material.paddingSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  btn: {
    backgroundColor: material.colorHeader1
  },
  get textButton() {
    return {
      ...this.textNormal,
      fontWeight: 'bold',
      color: material.colorDark
    };
  }
};

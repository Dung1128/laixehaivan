import material from '../../theme/variables/material';

export default {
  container: {},
  contentContainerList: {},
  textNormal: {
    fontSize: material.textSmall
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
  }
};
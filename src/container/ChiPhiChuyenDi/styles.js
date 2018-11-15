import material from '../../theme/variables/material';

export default {
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  textInputContainer: {
    flex: 1,
    marginVertical: material.paddingSmall
  },
  container: {
    padding: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: material.paddingNormal,
    backgroundColor: material.colorHeader1,
    borderRadius: 5
  },
  input: {
    fontSize: material.textNormal
  },
  get textButton() {
    return {
      ...this.textNormal,
      fontWeight: 'bold',
      color: material.colorDark
    };
  }
};

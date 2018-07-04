import material from '../../../theme/variables/material';

export default {
  textTitle: {
    fontSize: material.textNormal,
    fontWeight: 'bold'
  },
  title: {
    marginTop: material.paddingSmall,
    marginBottom: 0
  },
  textInputContainer: {
    // width: '100%',
    height: material.deviceHeight * 0.07,
    paddingHorizontal: 0,
    marginBottom: material.paddingNormal
  },
  insideTextInput: {
    fontSize: material.title,
    color: material.primaryColor
  },
  countApartment: {
    marginTop: -5,
    marginBottom: material.paddingSmall
  },
  loadingPage: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
    // backgroundColor: 'transparent'
  },
  textNormal: {
    fontSize: material.textNormal,
    fontWeight: 'bold'
  },
  itemModal: {
    paddingVertical: material.paddingNormal,
    borderBottomWidth: 1,
    borderColor: material.colorBorder,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  get itemModalCancel() {
    return {
      ...this.itemModal,
      borderBottomWidth: 0,
      marginTop: material.paddingSmall,
      backgroundColor: 'white'
    };
  },
  modal: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 10,
    alignItems: 'center'
  },
  dropdownHeader: {
    width: '100%',
    paddingHorizontal: material.paddingNormal,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: material.paddingSmall
  },
  dropdown: {
    color: material.primaryColor,
    fontSize: 20
  }
};

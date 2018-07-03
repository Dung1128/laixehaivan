import { PixelRatio, Platform } from 'react-native';
import material from '../../theme/variables/material';

export default {
  item: {
    width: '100%',
    borderBottomWidth: 0,
    paddingTop: 0,
    height: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    //fontFamily: 'Roboto',
    paddingBottom: 10,
    marginLeft: 0,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    color: material.primaryColor,
    fontSize: material.textNormal,
    width: '60%',
    height: '100%'
  },
  inputIcon: {
    paddingRight: 0,
    fontSize: material.textSmall,
    width: material.deviceHeight * 0.03,
    color: material.textGrey
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    marginBottom: 5,
    height: material.deviceHeight * 0.07,
    borderRadius: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: material.colorBorder,
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    overflow: 'hidden'
  },
  label: {},
  inputIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: material.deviceHeight * 0.07
  },
  photoIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: material.borderRadiusBase,
    borderWidth: 0.2,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    //backgroundColor: '#d9d9d9',
    borderRadius: material.borderRadiusBase
  },
  imgContainer: {
    width: material.deviceHeight * 0.15,
    height: material.deviceHeight * 0.15,
    borderRadius: material.borderRadiusBase,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9'
  },
  photoArrayContainer: {
    height: material.deviceHeight * 0.2,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  contentStyle: {
    width: '100%',
    height: '100%',
    marginRight: 10
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  errorText: {
    fontSize: material.textNormal,
    color: 'red'
  },

  Item: {
    flex: 1,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    justifyContent: 'center'
  },

  changeableTextInputInnerContainer: {
    width: '80%',
    borderBottomWidth: 0.5,
    marginBottom: 5,
    height: material.deviceHeight * 0.07
  },

  changeableTextInputButton: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  rectangleCheckboxButton: {
    borderWidth: 1,
    height: material.deviceHeight * 0.03,
    width: material.deviceHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red'
  },
  circleCheckboxButton: {
    borderWidth: 1,
    height: material.deviceHeight * 0.03,
    width: material.deviceHeight * 0.03,
    borderRadius: material.deviceHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red'
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: material.textNormal
  },
  checkboxFieldContainer: {
    marginBottom: 10,
    height: material.deviceHeight * 0.04,
    justifyContent: 'center'
  },
  textNormal: {
    fontSize: material.textNormal,
    color: material.colorDark
  }
};

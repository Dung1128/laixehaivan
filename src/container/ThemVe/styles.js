import material from '../../theme/variables/material';

export default {
  container: {
    padding: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal,
    color: material.colorDark
    // paddingLeft: material.paddingSmall
  },
  get textButton() {
    return {
      ...this.textNormal,

      fontWeight: 'bold'
    };
  },
  inputKhuyenMai: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: material.colorBorder,
    paddingHorizontal: material.paddingNormal
  },
  fieldInput: {
    flex: 1,
    paddingRight: material.paddingNormal
  },
  button: {
    height: '100%',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDatVe: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: material.colorHeader1
  },
  viewGiaVe: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: material.paddingSmall
  },
  itemFilter: {
    marginBottom: 5,
    height: material.deviceHeight * 0.07,
    borderRadius: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -2
  }
};

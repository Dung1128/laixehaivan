import material from '../../theme/variables/material';

export default {
  container: {
    padding: material.paddingNormal
  },
  textNormal: {
    fontSize: material.textNormal,
    paddingLeft: material.paddingSmall
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
    justifyContent: 'center'
  },
  viewGiaVe: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: material.paddingSmall
  }
};

import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Content, Text, ListItem, Left, View, Container } from 'native-base';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as authActions from '../../store/actions/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as commonActions from '../../store/actions/common';
import { getRouter } from '../../store/selectors/common';
import images from '../../assets/images';
import Icon from '../../elements/Icon';
import platform from '../../theme/variables/platform';
import options from './options';
import styles from './styles';
import material from '../../theme/variables/material';

const imagePickerOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
@connect(
  state => ({
    router: getRouter(state).current,
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    menu: haivanSelectors.getMenu(state)
  }),
  { ...authActions, ...commonActions, ...haivanActions }
)
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listMenu: []
    };
  }

  componentDidMount() {
    this.setState({
      listMenu: this.showMenu(this.props.menu)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menu !== nextProps.menu) {
      this.setState({
        listMenu: this.showMenu(nextProps.menu)
      });
    }
  }

  showMenu(menu) {
    const newMenu = [];
    menu.map(item => {
      switch (item.id) {
        case 1:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: '',
              icon: 'bus'
            })
          );
        case 2:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'chuyenDiCuaBan',
              icon: 'heart'
            })
          );
        case 3:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'bangDieuDo',
              icon: 'folder-open'
            })
          );
        case 4:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'lichDieuHanh',
              icon: 'md-information-circle'
            })
          );
        case 5:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'thanhTraList',
              icon: 'contacts'
            })
          );
        case 6:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'lichSuThanhTra',
              icon: 'contacts'
            })
          );
        case 7:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'huongDanSuDung',
              icon: 'bookmark'
            })
          );
        case 8:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'nhapMaXe',
              icon: 'keypad'
            })
          );
        case 9:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'doiMatKhau',
              icon: 'unlock'
            })
          );
        case 10:
          return (
            item.status !== 0 &&
            newMenu.push({
              name: item.title,
              route: 'logout',
              icon: 'contact'
            })
          );

        default:
          return newMenu;
      }
    });

    return newMenu;

    // this.setState(
    //   {
    //     listMenu: newMenu
    //   },
    //   () => console.log('success')
    // );
  }

  onFanProfilePress() {
    const { forwardTo, closeDrawer } = this.props;
    closeDrawer();
    // forwardTo('fanProfile');
  }

  _handleSuccessLogout() {
    const { forwardTo, setToast, removeAllCampaign } = this.props;
    // OneSignal.deleteTag("user_id")
    removeAllCampaign();
    forwardTo('login');
    setToast('Logout successfully!!!');
  }

  _handleFailLogout(error) {
    const { forwardTo, setToast, removeAllCampaign } = this.props;
    // OneSignal.deleteTag("user_id")
    removeAllCampaign();
    forwardTo('login');
    setToast(error.msg, 'error');
  }

  navigateTo(route) {
    // console.log('this.props.profile.adm_id', this.props.profile.adm_id);
    const { forwardTo, closeDrawer, resetTo } = this.props;
    if (route === 'logout') {
      this.props.onLogout(this.props.profile.adm_id, () => {
        closeDrawer();
        this.props.Logout();

        setTimeout(() => {
          this.props.logout();
        }, 200);
      });
    } else {
      if (route !== '') {
        forwardTo(route);
      }
    }
  }

  changeAvatar() {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: `data:image/jpeg;base64,${response.data}` };
        Alert.alert(
          'Change Avatar successfull',
          `Pick avatar successfull uri: ${source.uri}`,
          [
            {
              title: 'Ok'
            }
          ]
        );

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  }

  render() {
    const { router } = this.props;

    return (
      <Container>
        <Content bounces={false} style={styles.container}>
          <ListItem
            onPress={this.onFanProfilePress.bind(this)}
            style={styles.drawerCover}
          >
            <Text small style={styles.text}>
              {this.props.profile.adm_name}
            </Text>
          </ListItem>
          <View style={styles.listItemContainer}>
            {this.state.listMenu &&
              this.state.listMenu.map((item, index) => {
                const isCurrent = router.routeName === item.route;
                return (
                  <ListItem
                    noBorder
                    key={index}
                    button
                    onPress={() => this.navigateTo(item.route)}
                  >
                    <Left>
                      <Icon
                        name={item.icon}
                        style={[
                          styles.icon,
                          isCurrent && { color: material.colorHeader }
                        ]}
                      />
                      <Text
                        style={[
                          styles.iconText,
                          isCurrent && { color: material.colorHeader }
                        ]}
                      >
                        {item.name}
                      </Text>
                    </Left>
                  </ListItem>
                );
              })}
          </View>
        </Content>
        <View style={styles.footer}>
          <Text style={styles.iconText}>
            {platform.platform === 'ios'
              ? `App version: 1.3.2`
              : `App version: 2.18`}
          </Text>
        </View>
      </Container>
    );
  }
}

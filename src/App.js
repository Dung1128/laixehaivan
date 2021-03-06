import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackHandler,
  UIManager,
  StatusBar,
  Platform,
  Linking,
  Alert,
  View
} from 'react-native';
import { Drawer, StyleProvider, Container } from 'native-base';
import { isIphoneX } from 'react-native-iphone-x-helper';
import NetworkState, { Settings } from 'react-native-network-state';
import Navigator from './components/Navigator';
import Header from './components/Header';
import Footer from './components/Footer';
import AfterInteractions from './components/AfterInteractions';
// import Toasts from './components/Toasts';
import AlertMessage from './components/AlertMessage';
import SideBar from './components/SideBar';
import Browser from './components/Browser';
import Gallery from './components/Gallery';
import ConnectionStatusBar from './components/ConnectionStatusBar';
import Preload from './container/Preload';
import Loading from './components/Loading';
import getTheme from './theme/components';
import material from './theme/variables/material';

import { getDrawerState, getRouter } from './store/selectors/common';
import * as commonActions from './store/actions/common';
import * as haivanActions from './store/actions/haivan';
import * as accountActions from './store/actions/account';
import * as notificationActions from './store/actions/notification';

import routes from './routes';

const getPage = route => {
  const match = routes[route.routeName];
  match && Object.assign(match, route);
  return match;
};

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

@connect(
  state => ({
    router: getRouter(state),
    isPlayingGallery: state.ui.gallery.isPlaying,
    drawerState: getDrawerState(state)
  }),
  {
    ...commonActions,
    ...accountActions,
    ...notificationActions,
    ...haivanActions
  }
)
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleNetwork: true
    };
    this.firstTime = true;
    this.pageInstances = new Map();
  }

  componentDidMount() {
    const params = {
      type: Platform.OS === 'ios' ? 'ios' : 'android',
      currentVersion: Platform.OS === 'ios' ? 19 : 38
    };

    this.props.checkVersion(params, (e, d) => {
      if (d && d.status === 1) {
        Alert.alert(
          'Cập nhật phiên bản',
          'Bạn có muốn cập nhật phiên bản mới không?',
          [
            {
              text: 'Không',
              onPress: () => console.log('cancel update')
            },
            {
              text: 'Đồng ý',
              onPress: () => Linking.openURL(d.url)
            }
          ]
        );
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      const { router, goBack, isPlayingGallery, closeGallery } = this.props;
      // close gallery if exist
      if (isPlayingGallery) {
        closeGallery();
        return true;
      }
      // exit app
      if (router.stack.length === 0) {
        return false;
      }
      // go back
      goBack();
      return true;
    });
  }

  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({ router, drawerState }) {
    // process for route change only
    if (router.current.routeName !== this.props.router.current.routeName) {
      const route = getPage(router.current);
      if (route) {
        // show header and footer, and clear search string
        this.navigator.navigate(route);
        // this.header.show(route.headerType, route.title);
        this.handleShowHeaderFooter(this.header, route.headerType, route.title);
        // this.footer.show(route.footerType, route.routeName);
        this.handleShowHeaderFooter(
          this.footer,
          route.footerType,
          route.routeName
        );
      } else {
        // no need to push to route
        this.props.setToast(
          `Scene not found: ${router.current.routeName}`,
          'danger'
        );
      }
    }

    // check drawer
    if (drawerState !== this.props.drawerState) {
      this.drawer._root[drawerState === 'opened' ? 'open' : 'close']();
    }
  }

  handleShowHeaderFooter(ref, footerType, routeName) {
    if (!ref) {
      return;
    }
    let element = ref;
    let whatdog = 10;
    while (element._reactInternalFiber && whatdog > 0) {
      if (element.show) {
        element.show(footerType, routeName);
        break;
      }
      element =
        element._reactInternalFiber.child &&
        element._reactInternalFiber.child.stateNode;
      whatdog--;
    }
  }

  // we handle manually to gain performance
  shouldComponentUpdate() {
    return false;
  }

  _transitionScene = (prevIndex, index, thisNavigator) => {
    thisNavigator.enable(prevIndex, false);
    thisNavigator.transitionBetween(prevIndex, index, 0);
    thisNavigator.enable(index);
  };

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = route => {
    const component = (
      <AfterInteractions
        firstTime={this.firstTime}
        placeholder={route.Preload || <Preload />}
      >
        <route.Page
          route={route}
          app={this}
          ref={ref => this.pageInstances.set(route.routeName, ref)}
          onLogout={this._logout.bind(this)}
        />
      </AfterInteractions>
    );

    this.firstTime = false;
    return component;
  };

  _onLeftClick = type => {
    const { openDrawer, goBack } = this.props;
    switch (type) {
      case 'none':
        return false;
      case 'back':
      case 'searchBack':
        return goBack();
      default:
        return openDrawer();
    }
  };

  _onTabClick = (type, route) => {
    const { forwardTo } = this.props;
    switch (type) {
      case 'none':
        return false;
      default:
        return forwardTo(route);
    }
  };

  handleFocusableComponent(ref, focus = true) {
    if (!ref) {
      return;
    }
    // do not loop forever
    let element = ref;
    const method = focus ? 'componentWillFocus' : 'componentWillBlur';
    let whatdog = 10;
    while (element._reactInternalFiber && whatdog > 0) {
      if (element[method]) {
        element[method]();
        break;
      }
      element =
        element._reactInternalFiber.child &&
        element._reactInternalFiber.child.stateNode;
      whatdog--;
    }
  }
  _logout() {
    if (this.extraNavigator) {
      this.extraNavigator.clearAllScenes();
    }
  }

  _handlePageWillBlur = ({ routeName, cache }) => {
    if (cache)
      this.handleFocusableComponent(this.pageInstances.get(routeName), false);
    else this.pageInstances.delete(routeName);
  };

  _handlePageWillFocus = route => {
    this.handleFocusableComponent(
      this.pageInstances.get(route.routeName),
      true
    );
  };

  render() {
    const { router, drawerState, closeDrawer, openDrawer } = this.props;
    const route = getPage(router.current) || routes.notFound;
    const isiphoneX = isIphoneX();

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          {/* {Platform.OS === 'ios' ? (
            !isiphoneX ? (
              <MyStatusBar
                backgroundColor={material.colorDark2}
                barStyle="light-content"
              />
            ) : null
          ) : null} */}
          {Platform.OS === 'ios' ? (
            !isiphoneX ? (
              <StatusBar hidden barStyle="dark-content" />
            ) : (
              <StatusBar barStyle="dark-content" />
            )
          ) : (
            <StatusBar barStyle="light-content" />
          )}

          <Drawer
            ref={ref => (this.drawer = ref)}
            open={drawerState === 'opened'}
            type="displace"
            negotiatePan
            tweenDuration={300}
            tweenEasing="easeOutCubic"
            useInteractionManager
            content={<SideBar Logout={this._logout.bind(this)} />}
            onClose={closeDrawer}
            onOpen={openDrawer}
          >
            <Header
              type={route.headerType}
              title={route.title}
              onLeftClick={this._onLeftClick}
              onItemRef={ref => (this.header = ref)}
            />

            <Navigator
              onRef={ref => (this.extraNavigator = ref)}
              ref={ref => (this.navigator = ref)}
              initialRoute={route}
              renderScene={this._renderPage}
              onFocus={this._handlePageWillFocus}
              onBlur={this._handlePageWillBlur}
              transition={this._transitionScene}
              Logout={this._logout.bind(this)}
            />

            <Footer
              type={route.footerType}
              route={route.routeName}
              onTabClick={this._onTabClick}
              ref={ref => (this.footer = ref)}
            />

            <AlertMessage />
          </Drawer>
          <Gallery />
          <Browser />
          <Loading />
          {/* <ConnectionStatusBar
            onChangeStatus={val => this.props.saveConnect(val)}
          /> */}
          <NetworkState
            onConnected={() => {
              this.setState({
                visibleNetwork: false
              });
              this.props.saveConnect(true);
            }}
            onDisconnected={() => {
              this.props.saveConnect(false);
            }}
            visible={this.state.visibleNetwork}
          />
        </Container>
      </StyleProvider>
    );
  }
}

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
};

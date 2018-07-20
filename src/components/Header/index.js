import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Left,
  Right,
  Body,
  Text,
  Title,
  Button,
  Item,
  Input
} from 'native-base';
import { View, Keyboard } from 'react-native';
import * as commonSelectors from '../../store/selectors/common';
import * as commonActions from '../../store/actions/common';
import * as haivanSelectors from '../../store/selectors/haivan';
import * as haivanActions from '../../store/actions/haivan';
import * as notificationActions from '../../store/actions/notification';
import Icon from '../../elements/Icon';
import styles from './styles';
import material from '../../theme/variables/material';

@connect(
  state => ({
    searchString: commonSelectors.getSearchString(state),
    unReadNotification: state.notification.unRead,
    getActionXepCho: haivanSelectors.actionXepCho(state),
    getActionRemoveGhe: haivanSelectors.actionRemoveGhe(state),
    getActionThemVe: haivanSelectors.actionThemVe(state)
  }),
  { ...commonActions, ...notificationActions, ...haivanActions }
)
export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      title: props.title,
      notifyNumber: props.notifyNumber || 0
    };
  }

  componentDidMount() {
    this.props.onItemRef && this.props.onItemRef(this);
  }

  setNotifyNumber(number) {
    this.setState({ notifyNumber: number });
  }

  show(type, title) {
    this.setState({ type, title });
  }

  _leftClick = e => {
    const { onLeftClick } = this.props;
    Keyboard.dismiss();
    onLeftClick && onLeftClick(this.state.type);
  };

  _search = (value, force = false) => {
    if (this.props.searchString !== value || force) {
      this.props.search(value);
    }
  };

  _onPressSearch = () => {
    const { forwardTo } = this.props;
    forwardTo('search');
  };

  _onPressNotification = () => {
    const { forwardTo, throwNotification } = this.props;
    throwNotification();
    forwardTo('notification');
  };

  renderHeaderBack(title) {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name="ios-arrow-back" />
      </Button>
    );
    const center = (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
    return this.renderHeader(left, center);
  }

  // public data not event
  renderHeaderSearch(iconName = 'menu') {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name={iconName} />
      </Button>
    );
    const center = (
      <Item style={styles.searchContainer}>
        <Icon name="search" style={styles.searchIcon} />
        <Input
          value={this.props.searchString}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this._search}
          placeholderTextColor="#222"
          style={styles.searchInput}
          placeholder="Search"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
        <Icon name="ios-close" style={styles.searchIcon} />
      </Item>
    );
    const right = (
      <Button transparent>
        <Icon style={styles.searchIcon} name="search" />
      </Button>
    );
    return this.renderHeader(left, center, right);
  }

  renderHeaderHome(title) {
    const numberNotification =
      this.props.unReadNotification !== 0 ? (
        <View style={styles.badgeContainer}>
          <Text small white>
            {this.props.unReadNotification}
          </Text>
        </View>
      ) : null;

    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name="menu" />
      </Button>
    );
    const center = (
      <Title white style={{ alignSelf: 'center' }}>
        {title}
      </Title>
    );
    const right = (
      <View style={styles.rowIconContainer}>
        {/* <Button transparent onPress={() => this._onPressNotification()}>
          {numberNotification}
          <Icon style={styles.icon} name="ios-notifications" />
        </Button>
        <Button transparent onPress={() => this._onPressSearch()}>
          <Icon style={styles.icon} name="search" />
        </Button> */}
      </View>
    );
    return this.renderHeader(left, center, right);
  }

  renderHeaderSDG(title) {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name="menu" />
      </Button>
    );
    const center = (
      <Title white style={{ alignSelf: 'center' }}>
        {title}
      </Title>
    );
    const right = (
      <View style={styles.rowIconContainer}>
        {this.props.getActionXepCho === true && (
          <Button
            onPress={() => {
              this.props.actionRemoveGhe(false);
              this.props.actionXepCho(false);
              this.props.actionThemVe(false);
            }}
            transparent
          >
            <Text>Huỷ</Text>
          </Button>
        )}
        {this.props.getActionRemoveGhe === true && (
          <Button
            onPress={() => {
              this.props.actionRemoveGhe(false);
              this.props.actionXepCho(false);
              this.props.actionThemVe(false);
            }}
            transparent
          >
            <Text>Huỷ</Text>
          </Button>
        )}

        {this.props.getActionThemVe === true && (
          <Button
            onPress={() => {
              this.props.actionRemoveGhe(false);
              this.props.actionXepCho(false);
              this.props.actionThemVe(false);
            }}
            transparent
          >
            <Text>Huỷ</Text>
          </Button>
        )}
      </View>
    );
    return this.renderHeader(left, center, right);
  }

  renderHeader(left, center, right, props) {
    return (
      <Header noShadow {...props} style={styles.container}>
        <Left style={{ flex: 0.5 }}>{left}</Left>
        <Body style={{ flex: 1 }}>{center}</Body>
        <Right style={{ flex: 0.5 }}>{right}</Right>
      </Header>
    );
  }

  render() {
    // events will be
    const { type, title } = this.state;
    // event will be invoke via pageInstance
    switch (type) {
      case 'none':
        return false;
      case 'back':
        return this.renderHeaderBack(title);
      case 'home':
        return this.renderHeaderHome(title);
      case 'searchBack':
        return this.renderHeaderSearch('ios-arrow-back');
      case 'soDoGiuong':
        return this.renderHeaderSDG(title);
      default:
        return this.renderHeaderSearch();
    }
  }
}

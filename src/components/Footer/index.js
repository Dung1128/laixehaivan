import React, { PureComponent } from 'react';
import { PixelRatio, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Footer, FooterTab, Text } from 'native-base';
import * as haivanSelectors from '../../store/selectors/haivan';
import Icon from '../../elements/Icon';
import styles from './styles';
import options from './options';
import material from '../../theme/variables/material';

@connect(
  state => ({
    getCountTraKhach: haivanSelectors.countTraKhach(state),
    getCountDangCho: haivanSelectors.countDangCho(state)
  }),
  {}
)
export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      route: props.route
    };
  }

  tabClick(route) {
    const { onTabClick } = this.props;
    onTabClick && onTabClick(this.state.type, route);
  }

  show(type, route) {
    this.setState({ type, route });
  }

  renderFooterTabs(route) {
    return (
      <Footer>
        <FooterTab>
          {options.footerItems.map((item, index) => {
            const isActivated = route === item.route;
            return (
              <Button
                key={index}
                transparent
                onPress={this.tabClick.bind(this, item.route)}
              >
                <Icon
                  name={item.icon}
                  style={[
                    styles.icon,
                    isActivated && { color: material.brandWarning }
                  ]}
                />
                <Text
                  style={[
                    {
                      color: isActivated ? material.brandWarning : '#838383'
                    },
                    styles.text,

                    {
                      fontSize: PixelRatio.getFontScale() * 12,
                      width: '100%',
                      textAlign: 'center'
                    }
                  ]}
                >
                  {item.name}
                </Text>

                {this.props.getCountTraKhach > 0 &&
                  item.name === 'Trả khách' && (
                    <View style={styles.viewBadge}>
                      <Text numberOfLines={1} style={styles.textSmall}>
                        {this.props.getCountTraKhach}
                      </Text>
                    </View>
                  )}

                {this.props.getCountDangCho > 0 &&
                  item.name === 'Đang chờ' && (
                    <View style={styles.viewBadgeDangCho}>
                      <Text numberOfLines={1} style={styles.textSmall}>
                        {this.props.getCountDangCho}
                      </Text>
                    </View>
                  )}
              </Button>
            );
          })}
        </FooterTab>
      </Footer>
    );
  }

  render() {
    const { type, route } = this.state;
    // event will be invoke via pageInstance
    switch (type) {
      case 'none':
        return false;
      default:
        return this.renderFooterTabs(route);
    }
  }
}

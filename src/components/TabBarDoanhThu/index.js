import React from 'react';
import { Button, Text, View } from 'native-base';
import material from '../../theme/variables/material';
import styles from './styles';
// import options from './options';

class TabBarComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      not_read: 0
    };
  }
  renderButton(routeName, active, item, index) {
    let buttonStyle = {};
    if (index === 0) {
      buttonStyle = { ...styles.button, ...styles.buttonLeft };
    } else if (index === 2) {
      buttonStyle = { ...styles.button, ...styles.buttonRight };
    } else {
      buttonStyle = { ...styles.button, ...styles.buttonMiddle };
    }
    return (
      <Button
        style={{
          ...buttonStyle,
          backgroundColor: active ? material.primaryColor : '#fff'
        }}
        onPress={e => {
          this.props.navigation.navigate(routeName);
        }}
        key={routeName}
      >
        <Text
          uppercase={false}
          style={{
            ...styles.label,
            color: active ? '#fff' : material.primaryColor
          }}
        >
          {item.name}
        </Text>
      </Button>
    );
  }
  render() {
    const { navigationState } = this.props;
    const tabbar = [{ name: 'Tổng doanh thu' }, { name: 'Chưa có Seri' }];
    return (
      <View style={styles.footerContainer}>
        {navigationState.routes.map((item, index) =>
          this.renderButton(
            item.routeName,
            navigationState.index === index,
            tabbar[index],
            index
          )
        )}
      </View>
    );
  }
}
export default TabBarComponent;

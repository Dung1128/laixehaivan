import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, Tabs, Tab, View } from 'native-base';
import FabButton from '../../components/FabButton';
import { TabTask } from './tabTask';
import styles from './styles';
import TongDoanhThu from './TongDoanhThu';
import Seri from './Seri';

export default class DoanhThu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }

  checkStyle() {
    if (this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyle1() {
    if (!this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyle1() {
    if (!this.state.active) {
      return styles.itemActive;
    }
  }

  checkStyleText() {
    if (this.state.active) {
      return styles.itemActiveText;
    }
  }

  checkStyleText1() {
    if (!this.state.active) {
      return styles.itemActiveText;
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.styleTab}>
          <TouchableOpacity
            onPress={() =>
              !this.state.active &&
              this.setState({
                active: !this.state.active
              })
            }
            activeOpacity={0.7}
            style={{ ...styles.itemRow, ...this.checkStyle() }}
          >
            <Text style={{ ...styles.textNormal, ...this.checkStyleText() }}>
              Tổng doanh thu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.state.active &&
              this.setState({
                active: !this.state.active
              })
            }
            activeOpacity={0.7}
            style={{ ...styles.itemRow, ...this.checkStyle1() }}
          >
            <Text style={{ ...styles.textNormal, ...this.checkStyleText1() }}>
              Chưa có seri
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.active ? <TongDoanhThu /> : <Seri />}

        {/* <TabTask /> */}

        <FabButton />
      </Container>
    );
  }
}

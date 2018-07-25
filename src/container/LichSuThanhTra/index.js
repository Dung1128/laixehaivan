import React from 'react';
import { Container, Content, Text, View } from 'native-base';
import DateTimePicker from '../../components/DateTimePick';
import styles from './styles';
import material from '../../theme/variables/material';

export default class LichSuThanhTra extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }
  render() {
    return (
      <Container style={styles.container}>
        <DateTimePicker
          isShowDate={false}
          defaultDate={this.state.currentDate}
          onChange={val => {
            this.setState({ currentDate: val.date });
          }}
        />
        <View style={{ padding: material.paddingNormal }}>
          <Text>Lịch sử thanh tra đang trong quá trình phát triển</Text>
        </View>
      </Container>
    );
  }
}

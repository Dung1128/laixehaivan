import React from 'react';
import { Container, Content, Text } from 'native-base';
import DateTimePicker from '../../components/DateTimePick';
import styles from './styles';

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
        <Content contentContainerStyle={styles.content}>
          <Text>Lịch sử thanh tra</Text>
        </Content>
      </Container>
    );
  }
}

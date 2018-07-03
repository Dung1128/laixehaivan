import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class HuyVe extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>HuyVe</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

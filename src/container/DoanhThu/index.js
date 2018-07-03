import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class DoanhThu extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>DoanhThu</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

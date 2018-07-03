import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class TraKhach extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>TraKhach</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

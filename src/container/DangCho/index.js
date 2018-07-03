import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class DangCho extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>DangCho</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

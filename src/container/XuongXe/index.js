import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class XuongXe extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>XuongXe</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}

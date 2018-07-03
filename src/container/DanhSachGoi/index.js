import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';

export default class DanhSachGoi extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>DanhSachGoi</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}
